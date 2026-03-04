from rest_framework import serializers

from .models import Company, InstitutionFormation, User


def _find_user(identifier):
    """Busca un User por email o por teléfono."""
    try:
        return User.objects.get(email=identifier)
    except User.DoesNotExist:
        pass
    try:
        return User.objects.get(phone=int(identifier))
    except (ValueError, User.DoesNotExist):
        pass
    return None


def _find_entity(identifier):
    """Devuelve (entity, entity_type) o (None, None)."""
    user = _find_user(identifier)
    if user:
        return user, "user"

    for entity_type, model in [
        ("company", Company),
        ("institution", InstitutionFormation),
    ]:
        try:
            return model.objects.get(email=identifier), entity_type
        except model.DoesNotExist:
            continue

    return None, None


class LoginSerializer(serializers.Serializer):
    identifier = serializers.CharField()  # email o número de teléfono
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        entity, entity_type = _find_entity(attrs["identifier"])

        if entity is None:
            raise serializers.ValidationError("Invalid credentials")

        if not entity.check_password(attrs["password"]):
            raise serializers.ValidationError("Invalid credentials")

        if not entity.is_active:
            raise serializers.ValidationError("Account is inactive")

        attrs["entity"] = entity
        attrs["entity_type"] = entity_type
        return attrs


class RegisterUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ["name", "last_name", "email", "phone", "password", "consent", "role"]
        extra_kwargs = {
            "role": {"required": False},
            "phone": {"required": False},
            "consent": {"default": False},
        }

    def create(self, validated_data):
        from .models import Role
        password = validated_data.pop("password")
        if not validated_data.get("role"):
            validated_data["role"] = Role.objects.get(id=3)  # Practicante por defecto
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class RegisterCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ["name", "email", "description", "image_url", "consent"]
        extra_kwargs = {
            "description": {"required": False},
            "image_url": {"required": False},
        }

    def validate_consent(self, value):
        if not value:
            raise serializers.ValidationError("You must accept the terms to register.")
        return value

    def create(self, validated_data):
        from django.contrib.auth.hashers import make_password

        company = Company(**validated_data)
        company.password = make_password(None)
        company.save()
        return company


class RegisterInstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstitutionFormation
        fields = ["name", "email", "description", "image_url", "consent"]
        extra_kwargs = {
            "description": {"required": False},
            "image_url": {"required": False},
        }

    def validate_consent(self, value):
        if not value:
            raise serializers.ValidationError("You must accept the terms to register.")
        return value

    def create(self, validated_data):
        from django.contrib.auth.hashers import make_password

        institution = InstitutionFormation(**validated_data)
        institution.password = make_password(None)
        institution.save()
        return institution


class CompanyListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ["id", "name", "description", "image_url"]


class PendingCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ["id", "name", "email", "description", "image_url", "created_at"]


class PendingInstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstitutionFormation
        fields = ["id", "name", "email", "description", "image_url", "created_at"]


class UserProfileSerializer(serializers.ModelSerializer):
    entity_type = serializers.SerializerMethodField()

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
            "role",
            "is_hired",
            "is_active",
        ]

    def get_entity_type(self, obj):
        return "user"


class CompanyProfileSerializer(serializers.ModelSerializer):
    entity_type = serializers.SerializerMethodField()

    class Meta:
        model = Company
        fields = [
            "id",
            "entity_type",
            "name",
            "email",
            "description",
            "image_url",
            "role",
            "is_active",
        ]

    def get_entity_type(self, obj):
        return "company"


class InstitutionProfileSerializer(serializers.ModelSerializer):
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
            "role",
            "is_active",
        ]

    def get_entity_type(self, obj):
        return "institution"
