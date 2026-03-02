from django.db.models import Q
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.authentication.permissions import IsCompany

from .models import Vacancy
from .serializers import VacancyReadSerializer, VacancyWriteSerializer


def _get_vacancy_qs():
    return (
        Vacancy.objects
        .filter(is_active=True)
        .select_related('company', 'province', 'canton', 'currency')
        .prefetch_related('categories', 'requirements')
    )


class VacancyListCreateView(APIView):
    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAuthenticated(), IsCompany()]
        return [IsAuthenticated()]

    def get(self, request):
        qs = _get_vacancy_qs().order_by('-created_at')

        if province := request.query_params.get('province'):
            qs = qs.filter(province_id=province)
        if canton := request.query_params.get('canton'):
            qs = qs.filter(canton_id=canton)
        if type_ := request.query_params.get('type'):
            qs = qs.filter(type=type_)
        if modality := request.query_params.get('modality'):
            qs = qs.filter(modality=modality)
        if company := request.query_params.get('company'):
            qs = qs.filter(company_id=company)
        if category := request.query_params.get('category'):
            qs = qs.filter(categories__id=category).distinct()
        if search := request.query_params.get('search'):
            qs = qs.filter(Q(name__icontains=search) | Q(description__icontains=search))

        serializer = VacancyReadSerializer(qs, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = VacancyWriteSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        vacancy = serializer.save(company=request.user)
        return Response(VacancyReadSerializer(vacancy).data, status=status.HTTP_201_CREATED)


class VacancyDetailView(APIView):
    def get_permissions(self):
        if self.request.method in ('PATCH', 'DELETE'):
            return [IsAuthenticated(), IsCompany()]
        return [IsAuthenticated()]

    def _get_own_vacancy(self, pk, company_id):
        try:
            return _get_vacancy_qs().get(pk=pk, company_id=company_id)
        except Vacancy.DoesNotExist:
            return None

    def get(self, request, pk):
        try:
            vacancy = _get_vacancy_qs().get(pk=pk)
        except Vacancy.DoesNotExist:
            return Response({'detail': 'No encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        return Response(VacancyReadSerializer(vacancy).data)

    def patch(self, request, pk):
        vacancy = self._get_own_vacancy(pk, request.user.id)
        if not vacancy:
            return Response({'detail': 'No encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = VacancyWriteSerializer(vacancy, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        updated = serializer.save()
        return Response(VacancyReadSerializer(updated).data)

    def delete(self, request, pk):
        vacancy = self._get_own_vacancy(pk, request.user.id)
        if not vacancy:
            return Response({'detail': 'No encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        vacancy.is_active = False
        vacancy.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
