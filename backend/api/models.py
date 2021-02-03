from django.db import models
import string
import random

def generate_unique_product_code():
  length= 6

  while True:
    code = ''.join(random.choices(string.ascii_uppercase, k=length))
    if Product.objects.filter(code = code).count() == 0:
      break
    
  return code

# Create your models here.
class Product(models.Model):
  product_id = models.CharField(max_length=8, default="", unique=True)
  name = models.CharField( max_length=16, default="", unique=False)
  price = models.FloatField( default=0)
  created_at = models.DateTimeField( auto_now_add=True)