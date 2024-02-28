from rest_framework import serializers

from data.models import WebSite


class WebSiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = WebSite
        fields = ('id', 'url', 'name', 'slogan', 'email', 'telegram',
                  'phone', 'address')
