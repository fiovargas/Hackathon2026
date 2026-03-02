from django.contrib.auth.hashers import check_password as verify_password, make_password
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models


class Role(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        db_table = "role"


class AvailabilityStatus(models.Model):
    name = models.CharField(max_length=100)
    is_available = models.BooleanField(default=True)

    class Meta:
        db_table = "availability_status"


class UserManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser):
    role = models.ForeignKey(Role, on_delete=models.PROTECT, null=True, blank=True)
    status = models.ForeignKey(
        AvailabilityStatus, on_delete=models.SET_NULL, null=True, blank=True
    )
    image_url = models.URLField(blank=True)
    name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.BigIntegerField(null=True, blank=True)
    consent = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_hired = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name", "last_name"]

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser

    class Meta:
        db_table = "user"


class Company(models.Model):
    role = models.ForeignKey(Role, on_delete=models.PROTECT, null=True, blank=True)
    image_url = models.URLField(blank=True)
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    is_active = models.BooleanField(default=False)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

    @property
    def is_authenticated(self):
        return True

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return verify_password(raw_password, self.password)

    class Meta:
        db_table = "company"


class InstitutionFormation(models.Model):
    role = models.ForeignKey(Role, on_delete=models.PROTECT, null=True, blank=True)
    image_url = models.URLField(blank=True)
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    is_active = models.BooleanField(default=False)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

    @property
    def is_authenticated(self):
        return True

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return verify_password(raw_password, self.password)

    class Meta:
        db_table = "institution_formation"
