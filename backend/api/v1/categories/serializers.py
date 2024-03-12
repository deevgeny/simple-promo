from rest_framework import serializers

from data.models import Category


class CategorySerializer(serializers.ModelSerializer):
    """Category model serializer."""
    class Meta:
        model = Category
        fields = ('id', 'name', 'description')
