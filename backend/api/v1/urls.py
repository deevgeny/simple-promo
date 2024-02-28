from django.urls import path

from .website.views import web_site_view

urlpatterns = [
    path('website', web_site_view),
]
