from rest_framework import generics
from django.shortcuts import render
from .models import Category
from .serializers import CategorySerializer
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view


# Method for getting all categories by sending HTTP GET to /all
@api_view(['GET'])
def category_list(request):
  if request.method == 'GET':
    products = Category.objects.all()
    seializer = CategorySerializer(products, many = True)
    return JsonResponse(seializer.data, safe=False)


# Method for getting one category by sending HTTP GET with /<pk>
class category_detailed(generics.RetrieveAPIView):
  queryset = Category.objects.all()
  serializer_class = CategorySerializer