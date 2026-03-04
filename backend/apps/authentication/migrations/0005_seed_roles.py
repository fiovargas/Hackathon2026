from django.db import migrations


def seed_roles(apps, schema_editor):
    Role = apps.get_model("authentication", "Role")

    roles_data = [
        {"id": 1, "name": "Administrador"},
        {"id": 2, "name": "Aspirante"},
        {"id": 3, "name": "Practicante"},
        {"id": 4, "name": "Empresa"},
        {"id": 5, "name": "Institucion de formacion"},
    ]

    for role_data in roles_data:
        Role.objects.get_or_create(
            id=role_data["id"], defaults={"name": role_data["name"]}
        )


def reverse_seed_roles(apps, schema_editor):
    Role = apps.get_model("authentication", "Role")
    Role.objects.filter(id__in=[1, 2, 3, 4, 5]).delete()


class Migration(migrations.Migration):
    dependencies = [
        ("authentication", "0004_company_consent_institutionformation_consent"),
    ]

    operations = [
        migrations.RunPython(seed_roles, reverse_seed_roles),
    ]
