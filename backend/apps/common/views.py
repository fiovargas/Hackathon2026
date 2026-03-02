from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Canton, Category, Currency, Province, Requirement
from .serializers import (
    CantonSerializer,
    CategorySerializer,
    CurrencySerializer,
    ProvinceSerializer,
    RequirementSerializer,
)


class RequirementListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        qs = Requirement.objects.select_related('category').all()
        if category_id := request.query_params.get('category'):
            qs = qs.filter(category_id=category_id)
        return Response(RequirementSerializer(qs, many=True).data)


class CategoryListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        categories = Category.objects.prefetch_related('requirements').all()
        return Response(CategorySerializer(categories, many=True).data)


class CurrencyListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        currencies = Currency.objects.all()
        return Response(CurrencySerializer(currencies, many=True).data)


class ProvinceListView(APIView):
    """Devuelve todas las provincias con sus cantones anidados."""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        provinces = Province.objects.prefetch_related('cantons').all()
        return Response(ProvinceSerializer(provinces, many=True).data)


class CantonListView(APIView):
    """Lista cantones. Acepta ?province=<id> para filtrar."""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        qs = Canton.objects.select_related('province').all()
        if province_id := request.query_params.get('province'):
            qs = qs.filter(province_id=province_id)
        return Response(CantonSerializer(qs, many=True).data)
