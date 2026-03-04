from django.urls import path
from .views import AdminVacanciesView, AdminVacancyDetailView

urlpatterns = [
    path('vacancies/', AdminVacanciesView.as_view(), name='admin-vacancies'),
    path('vacancies/<int:pk>/', AdminVacancyDetailView.as_view(), name='admin-vacancy-detail'),
]
