import secrets
import string

from django.conf import settings
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


def generate_password(length=12):
    alphabet = string.ascii_letters + string.digits + "!@#$%&"
    return "".join(secrets.choice(alphabet) for _ in range(length))


def send_approval_email(to_email, entity_name, password):
    message = Mail(
        from_email=settings.SENDGRID_FROM_EMAIL,
        to_emails=to_email,
        subject="Tu cuenta ha sido aprobada",
        html_content=(
            f"<p>Hola <strong>{entity_name}</strong>,</p>"
            f"<p>Tu solicitud de registro ha sido aprobada. Tus credenciales de acceso son:</p>"
            f"<ul>"
            f"<li><strong>Correo:</strong> {to_email}</li>"
            f"<li><strong>Contraseña:</strong> {password}</li>"
            f"</ul>"
            f"<p>Por seguridad, te recomendamos cambiar tu contraseña al iniciar sesión.</p>"
        ),
    )
    SendGridAPIClient(settings.SENDGRID_API_KEY).send(message)
