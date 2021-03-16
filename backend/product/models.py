from django.db import models
from user.models import User
from category.models import Category
from location.models import Location
import string
import random

def generate_unique_product_code():
  length= 6

  while True:
    code = ''.join(random.choices(string.ascii_uppercase, k=length))
    if Product.objects.filter(code = code).count() == 0:
      break
    
  return code


class Product(models.Model):
  title = models.CharField( max_length=16, default="", unique=False)
  description = models.TextField(  default="", unique=False)
  image = models.CharField( max_length=200, default="")
  price = models.FloatField( default=0)
  ownerId = models.name = models.ForeignKey(User, blank='True', on_delete=models.CASCADE)
  locationId = models.ForeignKey(Location, blank='True', null=True, on_delete=models.SET_NULL)

  # Default category is NULL, which translates to "Annet" in frontend
  categoryId = models.name = models.ForeignKey(Category, blank='True', null = True, on_delete=models.SET_NULL)


  