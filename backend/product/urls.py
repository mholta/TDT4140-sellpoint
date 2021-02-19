from django.shortcuts import render
from django.urls import path
from .views import product, product_list,product_detailed

urlpatterns = [
    path('', product),
    path('<pk>', product_detailed.as_view()),
    path('all/', product_list)
]
