from django.shortcuts import render
from rest_framework import generics
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from .serializers import ProductSerializer
from .models import Product



# Create your views here.

class ProductView(generics.CreateAPIView):
#class ProductView(generics.ListAPIView):
  queryset = Product.objects.all()
  serializer_class = ProductSerializer

def ProductList(request):
  if request.method == 'GET':
    products = Product.objects.all()
    seializer = ProductSerializer(products, many = True)
    return JsonResponse(seializer.data, safe=False)