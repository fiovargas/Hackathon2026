from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'category'


class Requirement(models.Model):
    # db_column='id_category' para coincidir con el SQL seed (requirements.id_category)
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='requirements',
        db_column='id_category',
    )
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'requirements'


class Currency(models.Model):
    name = models.CharField(max_length=50)
    symbol = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.name} ({self.symbol})"

    class Meta:
        db_table = 'currency'


class Province(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'province'


class Canton(models.Model):
    province = models.ForeignKey(Province, on_delete=models.CASCADE, related_name='cantons')
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'canton'
