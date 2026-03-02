from django.urls import path

from .views import (
    DocumentDestroyView,
    DocumentDownloadView,
    DocumentListCreateView,
    DocumentRetrieveView,
    DocumentTestPageView,
)

urlpatterns = [
    path('', DocumentListCreateView.as_view(), name='document-list-create'),
    path('test/', DocumentTestPageView.as_view(), name='document-test'),
    path('<int:pk>/', DocumentRetrieveView.as_view(), name='document-retrieve'),
    path('<int:pk>/download/', DocumentDownloadView.as_view(), name='document-download'),
    path('<int:pk>/delete/', DocumentDestroyView.as_view(), name='document-destroy'),
]
