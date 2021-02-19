from django.shortcuts import render
from django.urls import path
from .views import product, product_list

urlpatterns = [
    path('', product),
    path('all/', product_list)
]
# Create your views here.
