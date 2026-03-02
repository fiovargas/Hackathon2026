from django.db import models

ENTITY_TYPES = [
    ('user', 'Usuario'),
    ('company', 'Empresa'),
    ('institution', 'Institución'),
    ('system', 'Sistema'),
]


class Notification(models.Model):
    # Emisor — sin FK directa para soportar cualquier tipo de entidad
    sender_type = models.CharField(max_length=20, choices=ENTITY_TYPES)
    sender_id = models.PositiveIntegerField(null=True, blank=True)  # null si es el sistema

    # Receptor
    receiver_type = models.CharField(max_length=20, choices=ENTITY_TYPES)
    receiver_id = models.PositiveIntegerField()

    # Contenido flexible: {"title": "...", "body": "...", "link": "/vacante/1"}
    content = models.JSONField()

    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'notification'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.sender_type}:{self.sender_id} → {self.receiver_type}:{self.receiver_id}"
