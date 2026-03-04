import os

from apps.authentication.authenticator import CookieJWTAuthentication
from apps.authentication.emails import (
    generate_password,
    send_institution_invitation_email,
    send_institution_welcome_email,
)
from apps.authentication.models import Company, InstitutionFormation, Role, User
from apps.authentication.permissions import IsCompany, IsInstitution, IsUser
from django.core.files.storage import default_storage
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken

from .models import InstitutionInvitation, UserInstitutionFormation
from .serializers import (
    AvatarUploadSerializer,
    CompanyProfileReadSerializer,
    CompanyProfileUpdateSerializer,
    InstitutionInvitationSerializer,
    InstitutionProfileReadSerializer,
    InstitutionProfileUpdateSerializer,
    RegisterUserByInstitutionSerializer,
    RespondInvitationSerializer,
    UserProfileReadSerializer,
    UserProfileUpdateSerializer,
)


class UserProfileView(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated, IsUser]

    def get(self, request):
        serializer = UserProfileReadSerializer(request.user)
        return Response(serializer.data)

    def patch(self, request):
        serializer = UserProfileUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.update(request.user, serializer.validated_data)
        return Response(UserProfileReadSerializer(user).data)


class CompanyProfileView(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated, IsCompany]

    def get(self, request):
        serializer = CompanyProfileReadSerializer(request.user)
        return Response(serializer.data)

    def patch(self, request):
        serializer = CompanyProfileUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        company = serializer.update(request.user, serializer.validated_data)
        return Response(CompanyProfileReadSerializer(company).data)


class InstitutionProfileView(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated, IsInstitution]

    def get(self, request):
        serializer = InstitutionProfileReadSerializer(request.user)
        return Response(serializer.data)

    def patch(self, request):
        serializer = InstitutionProfileUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        institution = serializer.update(request.user, serializer.validated_data)
        return Response(InstitutionProfileReadSerializer(institution).data)


_AVATAR_FOLDER = {
    User: "users",
    Company: "companies",
    InstitutionFormation: "institutions",
}


class AvatarUploadView(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = AvatarUploadSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        file = serializer.validated_data["avatar"]
        entity = request.user
        folder = _AVATAR_FOLDER.get(type(entity))
        if not folder:
            return Response(
                {"detail": "Unknown entity type"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        ext = os.path.splitext(file.name)[1].lower()
        upload_path = f"{folder}/{entity.id}/avatar/avatar{ext}"

        saved_path = default_storage.save(upload_path, file)
        url = default_storage.url(saved_path)

        entity.image_url = url
        entity.save()

        return Response({"image_url": url})


class RevokeConsentView(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        entity = request.user
        entity.consent = False
        entity.is_active = False
        entity.save()

        raw_token = request.COOKIES.get("refresh_token")
        if raw_token:
            try:
                RefreshToken(raw_token).blacklist()
            except TokenError:
                pass

        response = Response(
            {"detail": "Consent revoked and account deactivated."},
            status=status.HTTP_200_OK,
        )
        response.delete_cookie("access_token")
        response.delete_cookie("refresh_token")
        return response


class InstitutionRegisterUserView(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated, IsInstitution]

    def post(self, request):
        serializer = RegisterUserByInstitutionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        institution = request.user
        email = data["email"]

        existing_user = User.objects.filter(email=email).first()

        if existing_user is None:
            # New user: create, link, send welcome email with password
            password = generate_password()
            role = Role.objects.get(id=data["role_id"])
            user = User(
                name=data["name"],
                last_name=data["last_name"],
                email=email,
                role=role,
                consent=True,
            )
            user.set_password(password)
            user.save()
            UserInstitutionFormation.objects.create(user=user, institution=institution)
            send_institution_welcome_email(email, data["name"], institution.name, password)
            return Response(
                {"detail": "User registered and linked to institution."},
                status=status.HTTP_201_CREATED,
            )

        # Existing user: check if already linked
        if UserInstitutionFormation.objects.filter(user=existing_user, institution=institution).exists():
            return Response(
                {"detail": "User is already linked to this institution."},
                status=status.HTTP_409_CONFLICT,
            )

        # Check if there's already a pending invitation
        if InstitutionInvitation.objects.filter(
            user=existing_user,
            institution=institution,
            status=InstitutionInvitation.STATUS_PENDING,
        ).exists():
            return Response(
                {"detail": "An invitation is already pending for this user."},
                status=status.HTTP_409_CONFLICT,
            )

        InstitutionInvitation.objects.create(user=existing_user, institution=institution)
        send_institution_invitation_email(email, existing_user.name, institution.name)
        return Response(
            {"detail": "Invitation sent to existing user."},
            status=status.HTTP_200_OK,
        )


class UserInvitationsView(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated, IsUser]

    def get(self, request):
        invitations = InstitutionInvitation.objects.filter(
            user=request.user,
            status=InstitutionInvitation.STATUS_PENDING,
        ).select_related("institution")
        return Response(InstitutionInvitationSerializer(invitations, many=True).data)


class RespondInvitationView(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated, IsUser]

    def post(self, request, pk):
        try:
            invitation = InstitutionInvitation.objects.get(
                pk=pk,
                user=request.user,
                status=InstitutionInvitation.STATUS_PENDING,
            )
        except InstitutionInvitation.DoesNotExist:
            return Response(
                {"detail": "Invitation not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = RespondInvitationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        action = serializer.validated_data["action"]

        if action == "accept":
            invitation.status = InstitutionInvitation.STATUS_ACCEPTED
            invitation.save()
            UserInstitutionFormation.objects.get_or_create(
                user=request.user, institution=invitation.institution
            )
            return Response({"detail": "Invitation accepted."})

        invitation.status = InstitutionInvitation.STATUS_REJECTED
        invitation.save()
        return Response({"detail": "Invitation rejected."})
