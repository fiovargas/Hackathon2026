import os

from apps.authentication.authenticator import CookieJWTAuthentication
from apps.authentication.models import Company, InstitutionFormation, User
from apps.authentication.permissions import IsCompany, IsInstitution, IsUser
from django.core.files.storage import default_storage
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import (
    AvatarUploadSerializer,
    CompanyProfileReadSerializer,
    CompanyProfileUpdateSerializer,
    InstitutionProfileReadSerializer,
    InstitutionProfileUpdateSerializer,
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
