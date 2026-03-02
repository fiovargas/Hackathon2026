from rest_framework import serializers

from apps.common.models import Category, Requirement

from .models import Vacancy


class VacancyReadSerializer(serializers.ModelSerializer):
    company_name = serializers.ReadOnlyField(source='company.name')
    province_name = serializers.ReadOnlyField(source='province.name')
    canton_name = serializers.ReadOnlyField(source='canton.name')
    currency_symbol = serializers.ReadOnlyField(source='currency.symbol')
    categories = serializers.SlugRelatedField(many=True, read_only=True, slug_field='name')
    requirements = serializers.SlugRelatedField(many=True, read_only=True, slug_field='name')

    class Meta:
        model = Vacancy
        fields = [
            'id', 'name', 'description', 'type', 'modality',
            'salary_min', 'salary_max', 'is_active', 'created_at',
            'company', 'company_name',
            'province', 'province_name',
            'canton', 'canton_name',
            'currency', 'currency_symbol',
            'categories', 'requirements',
        ]


class VacancyWriteSerializer(serializers.ModelSerializer):
    category_ids = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Category.objects.all(), write_only=True, required=False,
    )
    requirement_ids = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Requirement.objects.all(), write_only=True, required=False,
    )

    class Meta:
        model = Vacancy
        fields = [
            'name', 'description', 'province', 'canton', 'currency',
            'type', 'modality', 'salary_min', 'salary_max',
            'category_ids', 'requirement_ids',
        ]

    def create(self, validated_data):
        categories = validated_data.pop('category_ids', [])
        requirements = validated_data.pop('requirement_ids', [])
        vacancy = Vacancy.objects.create(**validated_data)
        if categories:
            vacancy.categories.set(categories)
        if requirements:
            vacancy.requirements.set(requirements)
        return vacancy

    def update(self, instance, validated_data):
        categories = validated_data.pop('category_ids', None)
        requirements = validated_data.pop('requirement_ids', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        if categories is not None:
            instance.categories.set(categories)
        if requirements is not None:
            instance.requirements.set(requirements)
        return instance
