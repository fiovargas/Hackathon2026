from django.urls import path

from .views import VacancyDetailView, VacancyListCreateView

urlpatterns = [
    path('', VacancyListCreateView.as_view(), name='vacancy-list-create'),
    path('<int:pk>/', VacancyDetailView.as_view(), name='vacancy-detail'),
]
