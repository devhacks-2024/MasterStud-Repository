from django.urls import path
from . import views

urlpatterns = [
    path('', views.main, name='main'),
    path('upload/', views.uploadFile, name='upload'),
    path('input/', views.uploadInput, name='input'),
    path('optimize/', views.optimize, name='optimize')
]