from django.shortcuts import render
from rest_framework import generics
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from .serializers import UserSerializer
from .models import User
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

 
class UserView(generics.CreateAPIView):
#class ProductView(generics.ListAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer

def UserList(request):
  if request.method == 'GET':
    users = User.objects.all()
    seializer = UserSerializer(users, many = True)
    return JsonResponse(seializer.data, safe=False)

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
