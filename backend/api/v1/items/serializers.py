from rest_framework import serializers

from api.v1.categories.serializers import CategorySerializer
from data.models import Item


class ItemSerializer(serializers.ModelSerializer):
    "Item model serializer."
    category = CategorySerializer(read_only=True)
    # picture = serializers.SerializerMethodField()

    class Meta:
        model = Item
        fields = ('id', 'name', 'description', 'picture', 'price', 'visible',
                  'featured', 'category')
    
    # def get_picture(self, obj):
    #    """Remove host name from url."""
    #    if obj.picture:
    #        return obj.picture.url
    #    return None
