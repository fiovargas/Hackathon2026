from django.conf import settings
from django.db import models


class PostulationStatus(models.Model):
    name = models.CharField(max_length=50)  # Pendiente, Aceptado, Rechazado

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'postulation_status'


class Postulation(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='postulations',
    )
    vacancy = models.ForeignKey(
        'Vacancies.Vacancy',
        on_delete=models.CASCADE,
        related_name='postulations',
    )
    document = models.ForeignKey(
        'Documents.Document',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        help_text='CV adjunto al momento de postular',
    )
    status = models.ForeignKey(
        PostulationStatus,
        on_delete=models.PROTECT,
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'postulation'
        unique_together = ('user', 'vacancy')

    def __str__(self):
        return f"{self.user.email} -> {self.vacancy_id}"
