from django.shortcuts import render
from rest_framework import generics
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from .serializers import ProductSerializer
from .models import Product
from user.models import User
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models.expressions import RawSQL

# Method for getting all products by sending HTTP GET to /all
@api_view(['GET'])
def product_list(request):
  if request.method == 'GET':
    products = Product.objects.all()
    seializer = ProductSerializer(products, many = True)
    return JsonResponse(seializer.data, safe=False)

# POST - get products by user id
@api_view(['POST'])
def product_list_by_user(request):

  # Get product list by user id
  if request.method == 'POST':
    # Get and filter products by ownerId
    products = Product.objects.all().filter(ownerId = request.data['ownerId'])
    seializer = ProductSerializer(products, many = True)
    # Return products
    return JsonResponse(seializer.data, safe=False)

# POST - get products by category id and sort witrh requested sort method
@api_view(['POST'])
def product_list_filter_sort(request):
  # Get product list by user id
  if request.method == 'POST':

    # If distance object is sent
    try:
      distance_object = request.data['distance_object']
      latitude = distance_object.get('latitude')
      longitude = distance_object.get('longitude')
      max_distance = distance_object.get('max_distance')
      products = get_products_nearby_coords(latitude,longitude,max_distance)
    except:
      # Get and filter products by ownerId
      products = Product.objects.all()

    # If category id is sent with request, filter on this id
    if (request.data['categoryId'] != None):
      products = products.filter(categoryId = request.data['categoryId'])

    # If category id is sent with request, filter on this id
    if (request.data['categoryId'] != None):
      products = products.filter(categoryId = request.data['categoryId'])
    sort = request.data["sortMethod"]
    if (sort != None):
      if (sort == "price_asc"):
        products = products.order_by("price")
      elif (sort == "price_desc"):
        products = products.order_by("-price")
      elif (sort == "newest"):
        products = products.order_by("-created_at")
      elif (sort == "random"):
        products = products.order_by("?")
    seializer = ProductSerializer(products, many = True)
    # Return products
    return JsonResponse(seializer.data, safe=False)

# Method for getting products nearby
def get_products_nearby_coords(latitude, longitude, max_distance=None):
    """
    Return objects sorted by distance to specified coordinates
    which distance is less than max_distance given in kilometers
    """
    # Great circle distance formula
    gcd_formula = "6371 * acos(least(greatest(\
    cos(radians(%s)) * cos(radians(latitude)) \
    * cos(radians(longitude) - radians(%s)) + \
    sin(radians(%s)) * sin(radians(latitude)) \
    , -1), 1))"
    distance_raw_sql = RawSQL(
        gcd_formula,
        (latitude, longitude, latitude)
    )

    # Users closer than max_distance from (latitude, longitude)
    users = User.objects.all().exclude(latitude__isnull=True)\
    .exclude(longitude__isnull=True) \
    .annotate(distance=distance_raw_sql)\
    .order_by('distance')

    # Filter users closer than max_distance from (latitude, longitude)
    # and get products owned by these users
    if max_distance is not None:
      users = users.filter(distance__lt=max_distance).values_list('id')
      products = Product.objects.filter(ownerId__in=users)
    return products

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


# Method for getting all favorites by sending HTTP GET to /all
@api_view(['GET'])
def user_favorites_list(request):
  if request.method == 'GET':
    favorites = UserFavorites.objects.all().filter(ownerId = request.data['ownerId'])
    seializer = UserFavoritesSerializer(userFavorites, many = True)
    return JsonResponse(seializer.data, safe=False)


# Method for adding one product to a users favorites by sending HTTP POST.
# Use cases
# POST - recieve new a favorite relation between product and user
# DELETE - delete a favorite relation between product and user
@api_view(['POST','DELETE'])
def user_favorites_view(request):
  # Recieve new product from backend
  if request.method == 'POST':
    serializer = UserFavoritesSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
      # Implement error handling when trying to post a user that already exists
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
  # Delete a favorite relation between product and user
  elif request.method == 'DELETE':
    UserFavorites.objects.get(product=request.data['product']).delete()
    return HttpResponse()