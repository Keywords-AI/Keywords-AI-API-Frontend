from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('csrf', views.get_csrf, name='csrf'),
]