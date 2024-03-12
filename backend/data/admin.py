from django.contrib import admin

from .models import Category, Item, WebSite


@admin.register(WebSite)
class WebSiteAdmin(admin.ModelAdmin):
    list_display = ('id', 'url', 'name', 'slogan', 'banner', 'email',
                    'telegram', 'phone', 'address')
    list_display_links = ('id', 'url')


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description')
    list_display_links = ('id', 'name')


@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'category', 'picture',
                    'price', 'visible', 'featured')
    list_display_links = ('id', 'name')
