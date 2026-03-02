from rest_framework import serializers

from .models import Canton, Category, Currency, Province, Requirement


class RequirementSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()

    class Meta:
        model = Requirement
        fields = ["id", "name", "category"]


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name"]


class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = ["id", "name", "symbol"]


class CantonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Canton
        fields = ["id", "name", "province"]


class ProvinceSerializer(serializers.ModelSerializer):
    # Anidado: permite cargar provincia→cantones en una sola petición
    cantons = CantonSerializer(many=True, read_only=True)

    class Meta:
        model = Province
        fields = ["id", "name", "cantons"]
