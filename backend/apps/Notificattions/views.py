from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Notification
from .serializers import NotificationCreateSerializer, NotificationSerializer


def _my_notifications(request):
    """QuerySet de notificaciones del receptor autenticado."""
    return Notification.objects.filter(
        receiver_type=request.auth['entity_type'],
        receiver_id=request.user.id,
    )


class NotificationListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        notifications = _my_notifications(request)
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = NotificationCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(
            sender_type=request.auth['entity_type'],
            sender_id=request.user.id,
        )
        return Response(NotificationSerializer(serializer.instance).data, status=status.HTTP_201_CREATED)


class NotificationReadView(APIView):
    """Marca una notificación individual como leída."""
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        try:
            notification = _my_notifications(request).get(pk=pk)
        except Notification.DoesNotExist:
            return Response({'detail': 'No encontrado.'}, status=status.HTTP_404_NOT_FOUND)

        notification.is_read = True
        notification.save()
        return Response(NotificationSerializer(notification).data)


class NotificationReadAllView(APIView):
    """Marca todas las notificaciones del receptor como leídas."""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        updated = _my_notifications(request).filter(is_read=False).update(is_read=True)
        return Response({'updated': updated})
