import urllib.request

from django.http import Http404, StreamingHttpResponse
from django.views import View
from django.views.generic import TemplateView
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Document
from .serializers import DocumentSerializer, DocumentUploadSerializer


class DocumentListCreateView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request):
        documents = Document.objects.filter(is_active=True).order_by('-created_at')
        return Response(DocumentSerializer(documents, many=True).data)

    def post(self, request):
        serializer = DocumentUploadSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        document = serializer.save()
        return Response(DocumentSerializer(document).data, status=status.HTTP_201_CREATED)


class DocumentRetrieveView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request, pk):
        try:
            document = Document.objects.get(pk=pk, is_active=True)
        except Document.DoesNotExist:
            return Response({'detail': 'No encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        return Response(DocumentSerializer(document).data)


class DocumentDestroyView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def delete(self, request, pk):
        try:
            document = Document.objects.get(pk=pk, is_active=True)
        except Document.DoesNotExist:
            return Response({'detail': 'No encontrado.'}, status=status.HTTP_404_NOT_FOUND)

        document.is_active = False
        document.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


class DocumentDownloadView(View):
    def get(self, request, pk):
        try:
            document = Document.objects.get(pk=pk, is_active=True)
        except Document.DoesNotExist:
            raise Http404

        s3_url = document.file_url.url
        filename = document.file_url.name.split('/')[-1]

        remote = urllib.request.urlopen(s3_url)
        content_type = remote.headers.get('Content-Type', 'application/octet-stream')

        response = StreamingHttpResponse(remote, content_type=content_type)
        response['Content-Disposition'] = f'attachment; filename="{filename}"'
        return response


class DocumentTestPageView(TemplateView):
    template_name = 'documents/test.html'

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        ctx['documents'] = Document.objects.filter(is_active=True).order_by('-created_at')
        return ctx
