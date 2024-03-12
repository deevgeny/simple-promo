from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from data.models import Item

from .serializers import ItemSerializer


@api_view(['GET'])
@permission_classes([AllowAny])
def item_view(request):
    items = Item.objects.all()
    serializer = ItemSerializer(items, many=True)
    return Response(serializer.data)
