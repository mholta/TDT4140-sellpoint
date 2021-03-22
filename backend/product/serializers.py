from rest_framework import serializers
from .models import Product, UserFavorites

class ProductSerializer(serializers.ModelSerializer):
  class Meta:
    model = Product
    fields = ('id','title','description', 'price','image', 'ownerId', 'categoryId')

class UserFavoritesSerializer(serializers.ModelSerializer):
  class Meta:
    model = UserFavorites
    fields = ('id', 'user', 'product')