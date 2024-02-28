from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from data.models import WebSite

from .serializers import WebSiteSerializer


@api_view(['GET'])
@permission_classes([AllowAny])
def web_site_view(request):
    obj = WebSite.objects.last()
    if obj:
        serializer = WebSiteSerializer(obj)
        return Response(serializer.data)
    return Response(status=status.HTTP_404_NOT_FOUND)
