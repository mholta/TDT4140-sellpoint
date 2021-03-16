from django.shortcuts import render
from django.urls import path
from .views import product, product_list,product_detailed, product_list_by_user, product_list_filter_sort

urlpatterns = [
    path('', product),
    path('<pk>', product_detailed.as_view()),
    path('all/', product_list),
    path('user/', product_list_by_user),
    path('fs/', product_list_filter_sort)
]
