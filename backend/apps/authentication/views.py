from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken

from .authenticator import CookieJWTAuthentication, get_entity
from .emails import generate_password, send_approval_email
from .models import Company, InstitutionFormation, Role, User
from .permissions import IsAdmin
from .serializers import (
    CompanyProfileSerializer,
    InstitutionProfileSerializer,
    LoginSerializer,
    PendingCompanySerializer,
    PendingInstitutionSerializer,
    RegisterCompanySerializer,
    RegisterInstitutionSerializer,
    RegisterUserSerializer,
    UserProfileSerializer,
)

ROLE_EMPRESA = 4
ROLE_INSTITUCION = 5


def _build_token(entity, entity_type):
    refresh = RefreshToken()
    refresh["entity_type"] = entity_type
    refresh["entity_id"] = entity.id
    return refresh


def _set_auth_cookies(response, refresh):
    access = refresh.access_token
    response.set_cookie(
        "access_token",
        str(access),
        httponly=True,
        samesite="Lax",
        max_age=int(access.lifetime.total_seconds()),
    )
    response.set_cookie(
        "refresh_token",
        str(refresh),
        httponly=True,
        samesite="Lax",
        max_age=int(refresh.lifetime.total_seconds()),
    )


def _delete_auth_cookies(response):
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")


class LoginView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            print("ERRORS:", serializer.errors)
        serializer.is_valid(raise_exception=True)

        entity = serializer.validated_data["entity"]
        entity_type = serializer.validated_data["entity_type"]
        refresh = _build_token(entity, entity_type)

        response = Response({"detail": "Login successful"}, status=status.HTTP_200_OK)
        _set_auth_cookies(response, refresh)
        return response


class RefreshView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        raw_token = request.COOKIES.get("refresh_token")
        if not raw_token:
            return Response(
                {"detail": "Refresh token not found"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        try:
            old_refresh = RefreshToken(raw_token)
            entity_type = old_refresh["entity_type"]
            entity_id = old_refresh["entity_id"]
            old_refresh.blacklist()
            entity = get_entity(entity_type, entity_id)
            new_refresh = _build_token(entity, entity_type)
        except (TokenError, KeyError) as e:
            return Response({"detail": str(e)}, status=status.HTTP_401_UNAUTHORIZED)

        response = Response({"detail": "Token refreshed"}, status=status.HTTP_200_OK)
        _set_auth_cookies(response, new_refresh)
        return response


class RegisterUserView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        serializer = RegisterUserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = _build_token(user, "user")

        response = Response(
            {"detail": "Registration successful"}, status=status.HTTP_201_CREATED
        )
        _set_auth_cookies(response, refresh)
        return response


class RegisterCompanyView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        serializer = RegisterCompanySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            {"detail": "Registration submitted, pending admin approval"},
            status=status.HTTP_201_CREATED,
        )


class RegisterInstitutionView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        serializer = RegisterInstitutionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            {"detail": "Registration submitted, pending admin approval"},
            status=status.HTTP_201_CREATED,
        )


class LogoutView(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        raw_token = request.COOKIES.get("refresh_token")
        if raw_token:
            try:
                RefreshToken(raw_token).blacklist()
            except TokenError:
                pass

        response = Response({"detail": "Logout successful"}, status=status.HTTP_200_OK)
        _delete_auth_cookies(response)
        return response


class PendingCompaniesView(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAdmin]

    def get(self, request):
        companies = Company.objects.filter(is_active=False)
        serializer = PendingCompanySerializer(companies, many=True)
        return Response(serializer.data)


class PendingInstitutionsView(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAdmin]

    def get(self, request):
        institutions = InstitutionFormation.objects.filter(is_active=False)
        serializer = PendingInstitutionSerializer(institutions, many=True)
        return Response(serializer.data)


class ApproveCompanyView(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAdmin]

    def post(self, request, pk):
        try:
            company = Company.objects.get(id=pk, is_active=False)
        except Company.DoesNotExist:
            return Response(
                {"detail": "Not found or already approved"},
                status=status.HTTP_404_NOT_FOUND,
            )

        password = generate_password()
        company.role = Role.objects.get(id=ROLE_EMPRESA)
        company.is_active = True
        company.set_password(password)
        company.save()

        try:
            send_approval_email(company.email, company.name, password)
        except Exception:
            return Response(
                {"detail": "Approved", "warning": "Email could not be sent"},
                status=status.HTTP_200_OK,
            )

        return Response({"detail": "Company approved"}, status=status.HTTP_200_OK)


class ApproveInstitutionView(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAdmin]

    def post(self, request, pk):
        try:
            institution = InstitutionFormation.objects.get(id=pk, is_active=False)
        except InstitutionFormation.DoesNotExist:
            return Response(
                {"detail": "Not found or already approved"},
                status=status.HTTP_404_NOT_FOUND,
            )

        password = generate_password()
        institution.role = Role.objects.get(id=ROLE_INSTITUCION)
        institution.is_active = True
        institution.set_password(password)
        institution.save()

        try:
            send_approval_email(institution.email, institution.name, password)
        except Exception:
            return Response(
                {"detail": "Approved", "warning": "Email could not be sent"},
                status=status.HTTP_200_OK,
            )

        return Response({"detail": "Institution approved"}, status=status.HTTP_200_OK)


class MeView(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    SERIALIZERS = {
        User: UserProfileSerializer,
        Company: CompanyProfileSerializer,
        InstitutionFormation: InstitutionProfileSerializer,
    }

    def get(self, request):
        serializer_class = self.SERIALIZERS.get(type(request.user))
        if not serializer_class:
            return Response({"detail": "Unknown entity type"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer_class(request.user).data)
