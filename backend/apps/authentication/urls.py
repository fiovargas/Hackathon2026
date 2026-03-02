from django.urls import path

from .views import (
    ApproveCompanyView,
    ApproveInstitutionView,
    LoginView,
    LogoutView,
    MeView,
    PendingCompaniesView,
    PendingInstitutionsView,
    RefreshView,
    RegisterCompanyView,
    RegisterInstitutionView,
    RegisterUserView,
)

urlpatterns = [
    path("login/", LoginView.as_view(), name="auth-login"),
    path("refresh/", RefreshView.as_view(), name="auth-refresh"),
    path("logout/", LogoutView.as_view(), name="auth-logout"),
    path("register/user/", RegisterUserView.as_view(), name="auth-register-user"),
    path("register/company/", RegisterCompanyView.as_view(), name="auth-register-company"),
    path("register/institution/", RegisterInstitutionView.as_view(), name="auth-register-institution"),
    path("admin/pending/companies/", PendingCompaniesView.as_view(), name="admin-pending-companies"),
    path("admin/pending/institutions/", PendingInstitutionsView.as_view(), name="admin-pending-institutions"),
    path("admin/approve/company/<int:pk>/", ApproveCompanyView.as_view(), name="admin-approve-company"),
    path("admin/approve/institution/<int:pk>/", ApproveInstitutionView.as_view(), name="admin-approve-institution"),
    path("me/", MeView.as_view(), name="auth-me"),
]
