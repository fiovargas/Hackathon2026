from django.urls import path

from .views import (
    AvatarUploadView,
    CompanyProfileView,
    InstitutionProfileView,
    InstitutionRegisterUserView,
    RespondInvitationView,
    RevokeConsentView,
    UserInvitationsView,
    UserProfileView,
)

urlpatterns = [
    path("user/", UserProfileView.as_view(), name="user-profile"),
    path("company/", CompanyProfileView.as_view(), name="company-profile"),
    path("institution/", InstitutionProfileView.as_view(), name="institution-profile"),
    path("institution/register-user/", InstitutionRegisterUserView.as_view(), name="institution-register-user"),
    path("avatar/", AvatarUploadView.as_view(), name="avatar-upload"),
    path("revoke-consent/", RevokeConsentView.as_view(), name="revoke-consent"),
    path("invitations/", UserInvitationsView.as_view(), name="user-invitations"),
    path("invitations/<int:pk>/respond/", RespondInvitationView.as_view(), name="respond-invitation"),
]
