from django.contrib import admin

from .models import WebSite


@admin.register(WebSite)
class WebSiteAdmin(admin.ModelAdmin):
    list_display = ('id', 'url', 'name', 'slogan', 'banner', 'email',
                    'telegram', 'phone', 'address')
    list_display_links = ('id', 'url')
