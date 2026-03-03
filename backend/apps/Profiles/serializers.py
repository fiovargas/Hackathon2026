from apps.authentication.models import (
    AvailabilityStatus,
    Company,
    InstitutionFormation,
    User,
)
from rest_framework import serializers

from .models import CompanyExternalLink, ExternalLink, ProfileField, UserProfileField

ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/webp", "image/gif"}


class AvatarUploadSerializer(serializers.Serializer):
    avatar = serializers.FileField()

    def validate_avatar(self, file):
        content_type = getattr(file, "content_type", "")
        if content_type not in ALLOWED_IMAGE_TYPES:
            raise serializers.ValidationError(
                "Unsupported file type. Allowed: JPEG, PNG, WEBP, GIF."
            )
        return file


class ExternalLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExternalLink
        fields = ["id", "name", "url"]


class ProfileFieldSerializer(serializers.ModelSerializer):
    # Writable id allows callers to reference existing records in PATCH requests
    id = serializers.IntegerField(required=False)

    class Meta:
        model = ProfileField
        fields = ["id", "document", "training_center", "degree", "educational_level"]
        extra_kwargs = {
            "document": {"required": False},
            "training_center": {"required": False},
            "degree": {"required": False},
            "educational_level": {"required": False},
        }


# ─── USER ─────────────────────────────────────────────────────────────────────


class UserProfileReadSerializer(serializers.ModelSerializer):
    entity_type = serializers.SerializerMethodField()
    status_name = serializers.ReadOnlyField(source="status.name")
    profile_fields = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "entity_type",
            "name",
            "last_name",
            "email",
            "phone",
            "image_url",
            "is_hired",
            "is_active",
            "status",
            "status_name",
            "profile_fields",
        ]

    def get_entity_type(self, obj):
        return "user"

    def get_profile_fields(self, obj):
        upfs = UserProfileField.objects.filter(user=obj).select_related("profile_field")
        return ProfileFieldSerializer(
            [upf.profile_field for upf in upfs], many=True
        ).data


class UserProfileUpdateSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100, required=False)
    last_name = serializers.CharField(max_length=100, required=False)
    phone = serializers.IntegerField(required=False, allow_null=True)
    image_url = serializers.URLField(required=False, allow_blank=True)
    is_hired = serializers.BooleanField(required=False)
    status = serializers.PrimaryKeyRelatedField(
        queryset=AvailabilityStatus.objects.all(), required=False, allow_null=True
    )
    profile_fields = ProfileFieldSerializer(many=True, required=False)

    def update(self, instance, validated_data):
        profile_fields_data = validated_data.pop("profile_fields", None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if profile_fields_data is not None:
            for pf_data in profile_fields_data:
                pf_id = pf_data.pop("id", None)
                if pf_id:
                    # Update only if this profile_field belongs to the user
                    ProfileField.objects.filter(
                        id=pf_id,
                        user_profile_fields__user=instance,
                    ).update(**pf_data)
                else:
                    pf = ProfileField.objects.create(**pf_data)
                    UserProfileField.objects.create(user=instance, profile_field=pf)

        return instance


# ─── COMPANY ──────────────────────────────────────────────────────────────────


class CompanyProfileReadSerializer(serializers.ModelSerializer):
    entity_type = serializers.SerializerMethodField()
    external_links = serializers.SerializerMethodField()

    class Meta:
        model = Company
        fields = [
            "id",
            "entity_type",
            "name",
            "email",
            "description",
            "image_url",
            "is_active",
            "external_links",
        ]

    def get_entity_type(self, obj):
        return "company"

    def get_external_links(self, obj):
        company_links = CompanyExternalLink.objects.filter(company=obj).select_related(
            "external_link"
        )
        return ExternalLinkSerializer(
            [cl.external_link for cl in company_links], many=True
        ).data


class ExternalLinkWriteSerializer(serializers.Serializer):
    id = serializers.IntegerField(required=False)
    name = serializers.CharField(max_length=200, required=False)
    url = serializers.URLField(required=False)


class CompanyProfileUpdateSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=200, required=False)
    description = serializers.CharField(required=False, allow_blank=True)
    image_url = serializers.URLField(required=False, allow_blank=True)
    external_links = ExternalLinkWriteSerializer(many=True, required=False)

    def update(self, instance, validated_data):
        external_links_data = validated_data.pop("external_links", None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if external_links_data is not None:
            for link_data in external_links_data:
                link_id = link_data.pop("id", None)
                if link_id:
                    # Update only if this link belongs to the company
                    ExternalLink.objects.filter(
                        id=link_id,
                        company_external_links__company=instance,
                    ).update(**link_data)
                else:
                    link = ExternalLink.objects.create(**link_data)
                    CompanyExternalLink.objects.create(
                        company=instance, external_link=link
                    )

        return instance


# ─── INSTITUTION ──────────────────────────────────────────────────────────────


class InstitutionProfileReadSerializer(serializers.ModelSerializer):
    entity_type = serializers.SerializerMethodField()

    class Meta:
        model = InstitutionFormation
        fields = [
            "id",
            "entity_type",
            "name",
            "email",
            "description",
            "image_url",
            "is_active",
        ]

    def get_entity_type(self, obj):
        return "institution"


class InstitutionProfileUpdateSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=200, required=False)
    description = serializers.CharField(required=False, allow_blank=True)
    image_url = serializers.URLField(required=False, allow_blank=True)

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
