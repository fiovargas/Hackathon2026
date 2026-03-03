from django.urls import path

from .views import AvatarUploadView, CompanyProfileView, InstitutionProfileView, RevokeConsentView, UserProfileView

urlpatterns = [
    path("user/", UserProfileView.as_view(), name="user-profile"),
    path("company/", CompanyProfileView.as_view(), name="company-profile"),
    path("institution/", InstitutionProfileView.as_view(), name="institution-profile"),
    path("avatar/", AvatarUploadView.as_view(), name="avatar-upload"),
    path("revoke-consent/", RevokeConsentView.as_view(), name="revoke-consent"),
]
