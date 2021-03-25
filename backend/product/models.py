from django.db import models
from user.models import User
import string
import random
from category.models import Category
from django.db.models import Lookup

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
  image = models.TextField( default="")
  price = models.FloatField( default=0)
  ownerId = models.name = models.ForeignKey(User, blank='True', on_delete=models.CASCADE)
  created_at = models.DateTimeField(auto_now_add=True, null=True)
  categoryId = models.name = models.ForeignKey(Category, blank='True', null=True, default=1 , on_delete=models.SET_DEFAULT)

  latitude = models.FloatField( null=True)
  longitude = models.FloatField( null=True)

  def __str__(self):
    return self.title


class UserFavorites(models.Model):
  user = models.name = models.ForeignKey(User, blank='True', on_delete=models.CASCADE)
  product = models.name = models.ForeignKey(Product, blank = 'True', on_delete=models.CASCADE)

  def __str__(self):
    return "User: " + str(self.user) + ", Product: " + str(self.product)
  