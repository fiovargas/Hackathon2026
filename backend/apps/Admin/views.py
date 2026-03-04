from django.shortcuts import render

# Create your views here.
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.Vacancies.models import Vacancy, VacancyCategory, VacancyRequirement

class AdminVacanciesView(APIView):
    # authentication_classes = [CookieJWTAuthentication]
    # permission_classes = [IsAdmin]

    def get(self, request):
        # Bloque 1 y Bloque 8 - Listado con filtros
        queryset = Vacancy.objects.select_related('company').all().order_by('-created_at')
        
        # Filtros
        is_active = request.query_params.get('is_active')
        if is_active is not None:
            queryset = queryset.filter(is_active=is_active.lower() == 'true')
            
        is_expired = request.query_params.get('is_expired')
        if is_expired == 'true':
            queryset = queryset.filter(ends_at__lt=timezone.now().date())
            
        company_id = request.query_params.get('company_id')
        if company_id:
            queryset = queryset.filter(company_id=company_id)
        
        data = []
        for v in queryset:
            data.append({
                "id": v.id,
                "name": v.name,
                "company_name": v.company.name if v.company else "Sin Empresa",
                "description": v.description,
                "is_active": v.is_active,
                "starts_at": v.starts_at,
                "ends_at": v.ends_at,
                "created_at": v.created_at
            })
            
        return Response(data, status=status.HTTP_200_OK)


class AdminVacancyDetailView(APIView):
    # authentication_classes = [CookieJWTAuthentication]
    # permission_classes = [IsAdmin]

    def get(self, request, pk):
        # Bloque 2
        try:
            vacancy = Vacancy.objects.select_related('company').get(id=pk)
        except Vacancy.DoesNotExist:
            return Response({"detail": "Vacancy not found"}, status=status.HTTP_404_NOT_FOUND)
            
        # Categorias
        categories = VacancyCategory.objects.filter(vacancy=vacancy).select_related('category')
        cat_names = [vc.category.name for vc in categories if vc.category]
        
        # Requirements
        requirements = VacancyRequirement.objects.filter(vacancy=vacancy).select_related('requirement')
        req_names = [vr.requirement.name for vr in requirements if vr.requirement]
        
        data = {
            "id": vacancy.id,
            "name": vacancy.name,
            "company_name": vacancy.company.name if vacancy.company else "Sin Empresa",
            "description": vacancy.description,
            "type": vacancy.get_type_display() if hasattr(vacancy, 'get_type_display') else vacancy.type,
            "type_value": vacancy.type,
            "modality": vacancy.get_modality_display() if hasattr(vacancy, 'get_modality_display') else vacancy.modality,
            "salary_min": vacancy.salary_min,
            "salary_max": vacancy.salary_max,
            "is_active": vacancy.is_active,
            "starts_at": vacancy.starts_at,
            "ends_at": vacancy.ends_at,
            "external_url": vacancy.external_url,
            "created_at": vacancy.created_at,
            "categories": cat_names,
            "requirements": req_names
        }
        
        return Response(data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        # Bloque 3, 4, 5 y 6 - Actualizar Vacante y Notificar
        try:
            vacancy = Vacancy.objects.get(id=pk)
        except Vacancy.DoesNotExist:
            return Response({"detail": "Vacancy not found"}, status=status.HTTP_404_NOT_FOUND)

        data = request.data
        
        # Bloque 6 - Notificacion por cambio de estado
        if 'is_active' in data and data['is_active'] != vacancy.is_active:
            from apps.Notificattions.models import Notification
            
            is_active_new = data['is_active']
            message = "Tu vacante fue reactivada" if is_active_new else "Tu vacante fue desactivada por incumplir las normas"
            
            admin_id = request.user.id if request.user and request.user.is_authenticated else None
            
            Notification.objects.create(
                sender_type='system' if not admin_id else 'user',
                sender_id=admin_id,
                receiver_type='company',
                receiver_id=vacancy.company.id,
                content={"message": message, "vacancy": vacancy.name}
            )
            
            vacancy.is_active = is_active_new

        if 'name' in data: vacancy.name = data['name']
        if 'description' in data: vacancy.description = data['description']
        # Usamos salary_min como salary segun consulta si solo hay 'salary'
        if 'salary' in data: vacancy.salary_min = data['salary']
        if 'salary_min' in data: vacancy.salary_min = data['salary_min']
        if 'salary_max' in data: vacancy.salary_max = data['salary_max']
        if 'starts_at' in data: vacancy.starts_at = data['starts_at'] or None
        if 'ends_at' in data: vacancy.ends_at = data['ends_at'] or None
        if 'external_url' in data: vacancy.external_url = data['external_url']
        if 'type' in data: vacancy.type = data['type']
        
        vacancy.save()
        
        return Response({"detail": "Vacancy updated successfully"}, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        # Bloque 7 - Eliminar definitivamente
        try:
            vacancy = Vacancy.objects.get(id=pk)
            vacancy.delete()
            return Response({"detail": "Vacancy deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Vacancy.DoesNotExist:
            return Response({"detail": "Vacancy not found"}, status=status.HTTP_404_NOT_FOUND)
