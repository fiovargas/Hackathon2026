from rest_framework.permissions import BasePermission

from .models import Company, InstitutionFormation, User

ROLE_ADMIN = 1


class IsUser(BasePermission):
    def has_permission(self, request, view):
        return isinstance(request.user, User) and request.user.is_authenticated


class IsCompany(BasePermission):
    def has_permission(self, request, view):
        return isinstance(request.user, Company) and request.user.is_authenticated


class IsInstitution(BasePermission):
    def has_permission(self, request, view):
        return isinstance(request.user, InstitutionFormation) and request.user.is_authenticated


class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return (
            isinstance(request.user, User)
            and request.user.is_authenticated
            and request.user.role_id == ROLE_ADMIN
        )
