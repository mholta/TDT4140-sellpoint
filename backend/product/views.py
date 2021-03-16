from django.shortcuts import render
from rest_framework import generics
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from .serializers import ProductSerializer
from .models import Product
from location.models import Location
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Method for getting all products by sending HTTP GET to /all
@api_view(['GET'])
def product_list(request):
  if request.method == 'GET':
    produtcs = Product.objects.all()
    serializer = ProductSerializer(produtcs, many = True)
    return JsonResponse(serializer.data, safe=False)

# POST - get products by user id
@api_view(['POST'])
def product_list_by_user(request):

  # Get product list by user id
  if request.method == 'POST':
    # Get and filter products by ownerId
    products = Product.objects.all().filter(ownerId = request.data['ownerId'])
    serializer = ProductSerializer(products, many = True)
    # Return products
    return JsonResponse(serializer.data, safe=False)

@api_view(['POST'])
def product_list_filter_sort(request):

  user_location = Location(longitude=100, latitude=100)
  product_location = Location(longitude=200, latitude=200)

  dist = user_location.distance_to(product_location)
  print(dist)
  distance = 5000
  #print(Product.objects.annotate(abs_calculation=Func(F()user_location.distance_to(Location.objects.get(id=1)))).filter(abs_calculation_lt=distance))
  #print(Product.objects.annotate(abs_calculation=Func(F('x') - myPos.x, function='ABS') + Func(F('y') - myPos.y, function='ABS')).filter(abs_calculation__lt=distance))


  # Get product list by user id
  if request.method == 'POST':
    # Get and filter products by ownerId
    produtcs = Product.objects.all()
    # If category id is sent with request, filter on this id
    if (request.data['categoryId'] != None):
      produtcs = produtcs.filter(categoryId = request.data['categoryId'])
    seializer = ProductSerializer(produtcs, many = True)
    # Return products
    return JsonResponse(seializer.data, safe=False)



# Method for getting products within range --NOT FINISHED
def product_list_by_range(request):
  products = Product.objects.all()
  serializer = ProductSerializer(products, many = True)
  return JsonResponse(serializer.data, safe=False)

# Method for getting one product by sending HTTP GET with /<pk>
class product_detailed(generics.RetrieveAPIView):
  queryset = Product.objects.all()
  serializer_class = ProductSerializer

# Method for adding one product by sending HTTP POST.
# Use cases
# POST - recieve new product
# DELETE - delete product
# PUT - update product
@api_view(['POST','DELETE', 'PUT'])
def product(request):
  # Recieve new product from backend
  if request.method == 'POST':
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
      # Implement error handling when trying to post a user that already exists
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
  # Delete a product
  elif request.method == 'DELETE':
    Product.objects.get(pk=request.data['pk']).delete()
    return HttpResponse()
  
  # Update a product
  elif request.method == 'PUT':
    # Find product with pk and send 404 if not found
    try:
        print(request.data)
        product = Product.objects.get(pk=request.data['id'])
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    # Prepare for update current product
    serializer = ProductSerializer(product, data=request.data)
    if serializer.is_valid():
      # Update product object
      serializer.save()
      # Return product object - TODO: Needed in frontend? Could meybe remove need of page reload
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)