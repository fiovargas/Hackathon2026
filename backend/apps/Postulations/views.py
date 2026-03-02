from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.authentication.permissions import IsUser

from .models import Postulation
from .serializers import PostulationCreateSerializer, PostulationReadSerializer


class PostulationListCreateView(APIView):
    permission_classes = [IsAuthenticated, IsUser]

    def get(self, request):
        postulations = (
            Postulation.objects
            .filter(user=request.user)
            .select_related('vacancy', 'status', 'document')
            .order_by('-created_at')
        )
        serializer = PostulationReadSerializer(postulations, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PostulationCreateSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        postulation = serializer.save()
        return Response(
            PostulationReadSerializer(postulation).data,
            status=status.HTTP_201_CREATED,
        )


class PostulationDetailView(APIView):
    permission_classes = [IsAuthenticated, IsUser]

    def _get_postulation(self, pk, user):
        try:
            return Postulation.objects.select_related('vacancy', 'status', 'document').get(
                pk=pk, user=user
            )
        except Postulation.DoesNotExist:
            return None

    def get(self, request, pk):
        postulation = self._get_postulation(pk, request.user)
        if not postulation:
            return Response({'detail': 'No encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        return Response(PostulationReadSerializer(postulation).data)

    def delete(self, request, pk):
        postulation = self._get_postulation(pk, request.user)
        if not postulation:
            return Response({'detail': 'No encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        postulation.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
