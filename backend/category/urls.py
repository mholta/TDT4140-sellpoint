from django.shortcuts import render
from django.urls import path
from .views import all_categories

urlpatterns = [
    path('', all_categories)
    
]
