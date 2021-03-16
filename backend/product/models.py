from django.db import models
from user.models import User
import string
import random
from category.models import Category

def generate_unique_product_code():
  length= 6

  while True:
    code = ''.join(random.choices(string.ascii_uppercase, k=length))
    if Product.objects.filter(code = code).count() == 0:
      break
    
  return code

# Create your models here.

class Product(models.Model):
  title = models.CharField( max_length=16, default="", unique=False)
  description = models.TextField(  default="", unique=False)
  image = models.CharField( max_length=200, default="")
  price = models.FloatField( default=0)
  ownerId = models.name = models.ForeignKey(User, blank='True', on_delete=models.CASCADE)

  # Default category is NULL, which translates to "Annet" in frontend
  categoryId = models.name = models.ForeignKey(Category, blank='True', null = True, on_delete=models.SET_NULL)


  