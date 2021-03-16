from django.shortcuts import render
from django.urls import path
from .views import category_list

urlpatterns = [
    path('all/', category_list)
    
]
