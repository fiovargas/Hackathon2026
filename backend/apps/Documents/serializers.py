from rest_framework import serializers

from .models import Document


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ['id', 'file_url', 'type', 'is_default', 'is_active', 'created_at']


class DocumentUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ['file_url', 'type', 'is_default']
        extra_kwargs = {
            'is_default': {'required': False},
            'type': {'required': True},
        }
