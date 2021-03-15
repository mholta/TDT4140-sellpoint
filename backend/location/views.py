from rest_framework import generics
from django.shortcuts import render
from .models import Location
from .serializers import LocationSerializer

# Create your views here.
class all_locations(generics.ListAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer