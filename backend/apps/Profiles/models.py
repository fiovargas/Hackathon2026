from apps.authentication.models import Company
from django.conf import settings
from django.db import models


class ExternalLink(models.Model):
    name = models.CharField(max_length=200)
    url = models.URLField()

    def __str__(self):
        return self.name

    class Meta:
        db_table = "external_links"


class CompanyExternalLink(models.Model):
    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name="company_external_links",
    )
    external_link = models.ForeignKey(
        ExternalLink,
        on_delete=models.CASCADE,
        related_name="company_external_links",
    )

    class Meta:
        db_table = "company_external_links"


class ProfileField(models.Model):
    document = models.ForeignKey(
        "Documents.Document",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="profile_fields",
    )
    training_center = models.CharField(max_length=200, blank=True)
    degree = models.CharField(max_length=200, blank=True)
    educational_level = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f"{self.degree} - {self.educational_level}"

    class Meta:
        db_table = "profile_fields"


class UserProfileField(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="user_profile_fields",
    )
    profile_field = models.ForeignKey(
        ProfileField,
        on_delete=models.CASCADE,
        related_name="user_profile_fields",
    )

    class Meta:
        db_table = "user_profile_fields"
