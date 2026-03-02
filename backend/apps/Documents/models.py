from django.conf import settings
from django.db import models

from apps.authentication.models import Company, InstitutionFormation


def user_directory_path(instance, filename):
    if instance.user_id:
        return f'users/{instance.user_id}/documents/{filename}'
    elif instance.company_id:
        return f'companies/{instance.company_id}/documents/{filename}'
    elif instance.institution_id:
        return f'institutions/{instance.institution_id}/documents/{filename}'
    return f'documents/{filename}'


class Document(models.Model):
    class DocumentType(models.TextChoices):
        CV = 'CV', 'Curriculum Vitae'
        IMAGE = 'IMAGE', 'Imagen'
        PDF = 'PDF', 'PDF'
        DOC = 'DOC', 'Documento Word'
        DOCX = 'DOCX', 'Documento Word (moderno)'

    USER_ONLY_TYPES = {'CV', 'PDF', 'DOC', 'DOCX'}

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='documents',
        null=True,
        blank=True,
    )
    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name='documents',
        null=True,
        blank=True,
    )
    institution = models.ForeignKey(
        InstitutionFormation,
        on_delete=models.CASCADE,
        related_name='documents',
        null=True,
        blank=True,
    )
    file_url = models.FileField(upload_to=user_directory_path)
    type = models.CharField(
        max_length=10,
        choices=DocumentType.choices,
        default=DocumentType.CV,
    )
    is_default = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if self.is_default and self.type == Document.DocumentType.CV and self.user_id:
            Document.objects.filter(
                user_id=self.user_id,
                type=Document.DocumentType.CV,
                is_default=True,
            ).exclude(pk=self.pk).update(is_default=False)
        super().save(*args, **kwargs)

    def __str__(self):
        owner = self.user or self.company or self.institution
        return f"{self.type} - {owner}"

    class Meta:
        db_table = 'document'
