from django.shortcuts import render
from rest_framework import generics
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from .serializers import UserSerializer
from .models import User
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

 
#class user(generics.CreateAPIView):
class user(generics.ListAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer

@api_view(['POST','PUT','DELETE'])
def user_view(request):
  print(request)
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
  elif request.method == 'PUT':
    print(request.data['user'])
    try:
        user = User.objects.get(pk=request.data['org_email'])
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = UserSerializer(user, data=request.data['user'])
    if serializer.is_valid():
      print(request.data) 
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  elif request.method == 'DELETE':
    User.objects.get(pk=request.data['pk']).delete()
    return HttpResponse()

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
