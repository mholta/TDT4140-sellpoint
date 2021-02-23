from django.shortcuts import render
from rest_framework import generics
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from .serializers import ProductSerializer
from .models import Product
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Method for getting all products by sending HTTP GET to /all
@api_view(['GET'])
def product_list(request):
  if request.method == 'GET':
    produtcs = Product.objects.all()
    seializer = ProductSerializer(produtcs, many = True)
    return JsonResponse(seializer.data, safe=False)

# Method for getting all products by sending HTTP GET to /all
@api_view(['POST'])
def product_list_by_user(request):
  print(request.data)
  if request.method == 'POST':
    produtcs = Product.objects.all().filter(email = request.data['email'])
    seializer = ProductSerializer(produtcs, many = True)
    return JsonResponse(seializer.data, safe=False)

# Method for getting one product by sending HTTP GET with /<pk>
class product_detailed(generics.RetrieveAPIView):
  queryset = Product.objects.all()
  serializer_class = ProductSerializer

# Method for adding one product by sending HTTP POST
@api_view(['POST','DELETE', 'PUT'])
def product(request):
  if request.method == 'POST':
    print(request.data)
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
      # Implement error handling when trying to post a user that already exists
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  elif request.method == 'DELETE':
    Product.objects.get(pk=request.data['pk']).delete()
    return HttpResponse()
  elif request.method == 'PUT':
    print(request.data)
    try:
        product = Product.objects.get(pk=request.data['id'])
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = ProductSerializer(product, data=request.data)
    if serializer.is_valid():
      print(request.data) 
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)