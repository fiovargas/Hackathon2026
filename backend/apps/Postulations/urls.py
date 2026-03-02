from django.urls import path

from .views import PostulationDetailView, PostulationListCreateView

urlpatterns = [
    path('', PostulationListCreateView.as_view(), name='postulation-list-create'),
    path('<int:pk>/', PostulationDetailView.as_view(), name='postulation-detail'),
]
