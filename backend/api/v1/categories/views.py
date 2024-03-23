from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from data.models import Category

from .serializers import CategorySerializer


@api_view(['GET'])
@permission_classes([AllowAny])
def category_view(request):
    categories = Category.objects.prefetch_related('items').all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)
