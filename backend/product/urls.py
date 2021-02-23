from django.shortcuts import render
from django.urls import path
from .views import product, product_list,product_detailed, product_list_by_user

urlpatterns = [
    path('', product),
    path('<pk>', product_detailed.as_view()),
    path('all/', product_list),
    path('user/', product_list_by_user),
]
