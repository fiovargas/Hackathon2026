from rest_framework import serializers

from apps.Documents.models import Document

from .models import Postulation, PostulationStatus


class PostulationReadSerializer(serializers.ModelSerializer):
    vacancy_name = serializers.ReadOnlyField(source='vacancy.name')
    company_name = serializers.ReadOnlyField(source='vacancy.company.name')
    status_name = serializers.ReadOnlyField(source='status.name')
    document_url = serializers.SerializerMethodField()

    class Meta:
        model = Postulation
        fields = [
            'id', 'vacancy', 'vacancy_name', 'company_name',
            'status', 'status_name', 'document', 'document_url',
            'created_at',
        ]

    def get_document_url(self, obj):
        if obj.document and obj.document.file_url:
            return obj.document.file_url.url
        return None


class PostulationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Postulation
        fields = ['vacancy', 'document']
        extra_kwargs = {
            'document': {'required': False},
        }

    def validate_document(self, document):
        if document is None:
            return document
        user = self.context['request'].user
        if document.user != user:
            raise serializers.ValidationError('El documento no pertenece al usuario.')
        if not document.is_active:
            raise serializers.ValidationError('El documento no está activo.')
        return document

    def validate(self, attrs):
        user = self.context['request'].user
        vacancy = attrs['vacancy']
        if Postulation.objects.filter(user=user, vacancy=vacancy).exists():
            raise serializers.ValidationError('Ya te has postulado a esta vacante.')
        return attrs

    def create(self, validated_data):
        status, _ = PostulationStatus.objects.get_or_create(name='Pendiente')
        validated_data['status'] = status
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
