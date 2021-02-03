from django.urls import path
from .views import ProductView, ProductList

urlpatterns = [
    path('', ProductView.as_view()),
    path('products', ProductList)
]
