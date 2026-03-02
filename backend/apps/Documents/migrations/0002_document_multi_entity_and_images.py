import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Documents', '0001_initial'),
        ('authentication', '0003_user_is_staff_user_is_superuser_and_more'),
    ]

    operations = [
        # user pasa a ser nullable (company e institution también lo usan)
        migrations.AlterField(
            model_name='document',
            name='user',
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name='documents',
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        # FK a Company
        migrations.AddField(
            model_name='document',
            name='company',
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name='documents',
                to='authentication.company',
            ),
        ),
        # FK a InstitutionFormation
        migrations.AddField(
            model_name='document',
            name='institution',
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name='documents',
                to='authentication.institutionformation',
            ),
        ),
        # Actualizar choices del campo type
        migrations.AlterField(
            model_name='document',
            name='type',
            field=models.CharField(
                choices=[
                    ('CV', 'Curriculum Vitae'),
                    ('IMAGE', 'Imagen'),
                    ('PDF', 'PDF'),
                    ('DOC', 'Documento Word'),
                    ('DOCX', 'Documento Word (moderno)'),
                ],
                default='CV',
                max_length=10,
            ),
        ),
    ]
