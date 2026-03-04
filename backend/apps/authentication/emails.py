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


def send_institution_welcome_email(to_email, name, institution_name, password):
    message = Mail(
        from_email=settings.SENDGRID_FROM_EMAIL,
        to_emails=to_email,
        subject=f"Bienvenido/a a {institution_name}",
        html_content=(
            f"<p>Hola <strong>{name}</strong>,</p>"
            f"<p>Has sido registrado/a en la plataforma por <strong>{institution_name}</strong>.</p>"
            f"<p>Tus credenciales de acceso son:</p>"
            f"<ul>"
            f"<li><strong>Correo:</strong> {to_email}</li>"
            f"<li><strong>Contraseña:</strong> {password}</li>"
            f"</ul>"
            f"<p>Por seguridad, te recomendamos cambiar tu contraseña al iniciar sesión.</p>"
        ),
    )
    SendGridAPIClient(settings.SENDGRID_API_KEY).send(message)


def send_institution_invitation_email(to_email, name, institution_name):
    message = Mail(
        from_email=settings.SENDGRID_FROM_EMAIL,
        to_emails=to_email,
        subject=f"Invitación de {institution_name}",
        html_content=(
            f"<p>Hola <strong>{name}</strong>,</p>"
            f"<p><strong>{institution_name}</strong> te ha enviado una invitación para asociarte a su institución en la plataforma.</p>"
            f"<p>Ingresa a tu cuenta para aceptar o rechazar la invitación.</p>"
        ),
    )
    SendGridAPIClient(settings.SENDGRID_API_KEY).send(message)
