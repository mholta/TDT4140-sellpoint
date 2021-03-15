from django.shortcuts import render
from django.urls import path
from .views import all_locations

urlpatterns = [
    path('', all_locations)
]
