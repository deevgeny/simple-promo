from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .categories.views import category_view
from .items.views import ItemViewSet
from .website.views import web_site_view

router = DefaultRouter(trailing_slash=False)
router.register('items', ItemViewSet)

urlpatterns = [
    path('website', web_site_view),
    path('categories', category_view),
    path('', include(router.urls))
]
