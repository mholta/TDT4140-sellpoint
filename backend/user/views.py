from django.shortcuts import render
from rest_framework import generics
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from .serializers import UserSerializer
from .models import User
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

 
class user(generics.CreateAPIView):
#class ProductView(generics.ListAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer

@api_view(['POST'])
def user_view(request):
  if request.method == 'POST':
    # Checks is user with email exists in db
    if (User.objects.all().filter(email=request.data['email']).count() > 0):
      # Get user with matching email
      user = User.objects.get(email=request.data['email'])
      # Checks if password matches
      print(user.password)
      if (request.data['password'] == user.password):
        # Send json responce with the user object
        serializer = UserSerializer(user, many = False)
        return JsonResponse(serializer.data, safe=False)
      else:
        # If passowrd is wrong
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    else:
      # If user is not found with email
      return Response(status=status.HTTP_404_NOT_FOUND)

class UserDetailedView(generics.RetrieveAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer

@api_view(['POST'])
def user_list(request):
  if request.method == 'POST':
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
      # Implement error handling when trying to post a user that already exists
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
