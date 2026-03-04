from django.db import models


class Vacancy(models.Model):
    class VacancyType(models.TextChoices):
        FULL_TIME = 'full_time', 'Tiempo Completo'
        PART_TIME = 'part_time', 'Medio Tiempo'
        INTERNSHIP = 'internship', 'Práctica'
        CONTRACT = 'contract', 'Contrato'

    class Modality(models.TextChoices):
        PRESENTIAL = 'presential', 'Presencial'
        REMOTE = 'remote', 'Remoto'
        HYBRID = 'hybrid', 'Híbrido'

    company = models.ForeignKey(
        'authentication.Company',
        on_delete=models.CASCADE,
        related_name='vacancies',
    )
    province = models.ForeignKey('common.Province', on_delete=models.SET_NULL, null=True, blank=True)
    canton = models.ForeignKey('common.Canton', on_delete=models.SET_NULL, null=True, blank=True)
    currency = models.ForeignKey('common.Currency', on_delete=models.SET_NULL, null=True, blank=True)
    categories = models.ManyToManyField('common.Category', through='VacancyCategory', blank=True)
    requirements = models.ManyToManyField('common.Requirement', through='VacancyRequirement', blank=True)

    name = models.CharField(max_length=200)
    description = models.TextField()
    type = models.CharField(max_length=20, choices=VacancyType.choices)
    modality = models.CharField(max_length=20, choices=Modality.choices)
    salary_min = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    salary_max = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    starts_at = models.DateField(null=True, blank=True)
    ends_at = models.DateField(null=True, blank=True)
    external_url = models.URLField(max_length=200, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'vacancy'


class VacancyCategory(models.Model):
    vacancy = models.ForeignKey(Vacancy, on_delete=models.CASCADE)
    category = models.ForeignKey('common.Category', on_delete=models.CASCADE)

    class Meta:
        db_table = 'vacancy_category'
        unique_together = ('vacancy', 'category')


class VacancyRequirement(models.Model):
    vacancy = models.ForeignKey(Vacancy, on_delete=models.CASCADE)
    requirement = models.ForeignKey('common.Requirement', on_delete=models.CASCADE)

    class Meta:
        db_table = 'vacancy_requirement'
        unique_together = ('vacancy', 'requirement')
