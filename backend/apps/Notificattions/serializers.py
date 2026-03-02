from rest_framework import serializers

from apps.authentication.models import Company, InstitutionFormation, User

from .models import Notification

_ENTITY_MODELS = {
    'user': User,
    'company': Company,
    'institution': InstitutionFormation,
}


class NotificationSerializer(serializers.ModelSerializer):
    sender_name = serializers.SerializerMethodField()

    class Meta:
        model = Notification
        fields = [
            'id', 'content',
            'sender_type', 'sender_id', 'sender_name',
            'receiver_type', 'receiver_id',
            'is_read', 'created_at',
        ]
        read_only_fields = ['sender_type', 'sender_id', 'created_at']

    def get_sender_name(self, obj):
        if obj.sender_type == 'system' or obj.sender_id is None:
            return 'Sistema'
        model = _ENTITY_MODELS.get(obj.sender_type)
        if not model:
            return None
        try:
            return model.objects.values_list('name', flat=True).get(id=obj.sender_id)
        except model.DoesNotExist:
            return None


class NotificationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['receiver_type', 'receiver_id', 'content']
