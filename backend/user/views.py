from django.shortcuts import render
from rest_framework import generics
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from .serializers import UserSerializer
from .models import User


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
  