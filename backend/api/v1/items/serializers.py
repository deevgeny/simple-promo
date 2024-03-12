from rest_framework import serializers

from api.v1.categories.serializers import CategorySerializer
from data.models import Item


class ItemSerializer(serializers.ModelSerializer):
    "Item model serializer."
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Item
        fields = ('id', 'name', 'description', 'picture', 'price', 'visible',
                  'featured', 'category')
