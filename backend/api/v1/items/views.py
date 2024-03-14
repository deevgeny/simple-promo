from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import GenericViewSet

from data.models import Item

from .serializers import ItemSerializer


class ItemViewSet(GenericViewSet, ListModelMixin, RetrieveModelMixin):
    """Item model view set.

    actions:
    - list
    - retrieve
    """
    queryset = Item.objects.filter(visible=True)
    serializer_class = ItemSerializer
    permission_classes = (AllowAny,)
    filter_backends = (DjangoFilterBackend,)
    filterset_fields = ('category', 'featured')
