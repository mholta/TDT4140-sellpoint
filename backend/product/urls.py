from django.shortcuts import render
from django.urls import path
from .views import product, product_list,product_detailed, product_list_by_user, product_list_filter_sort, user_favorites_list, user_favorites_view

urlpatterns = [
    path('', product),
    path('<pk>', product_detailed.as_view()),
    path('all/', product_list),
    path('user/', product_list_by_user),
    path('fs/', product_list_filter_sort),
    
    # GET - favorites by user
    path('favorites_list/', user_favorites_list),

    # POST/DELETE - create/delete favorite relation between user and product
    path('favorites/', user_favorites_view)
]
