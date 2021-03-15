from rest_framework import generics
from django.shortcuts import render
from .models import Category
from .serializers import CategorySerializer

# Create your views here.
class all_categories(generics.ListAPIView):
  queryset = Category.objects.all()
  serializer_class = CategorySerializer
