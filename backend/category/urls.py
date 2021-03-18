from django.shortcuts import render
from django.urls import path
from .views import category_list, category_detailed

urlpatterns = [
    path('all/', category_list),
    path('<pk>', category_detailed.as_view())

    
]
