from django.urls import path

from .views import NotificationListCreateView, NotificationReadAllView, NotificationReadView

urlpatterns = [
    path('', NotificationListCreateView.as_view(), name='notification-list-create'),
    path('<int:pk>/read/', NotificationReadView.as_view(), name='notification-read'),
    path('read-all/', NotificationReadAllView.as_view(), name='notification-read-all'),
]
