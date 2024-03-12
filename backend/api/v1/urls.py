from django.urls import path

from .categories.views import category_view
from .items.views import item_view
from .website.views import web_site_view

urlpatterns = [
    path('website', web_site_view),
    path('categories', category_view),
    path('items', item_view)
]
