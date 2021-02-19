from django.db import models

# Create your models here.
class User(models.Model):
    email        = models.CharField(max_length=50,unique=True, blank=False)
    first_name         = models.CharField(max_length=50)
    last_name         = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=8)
    password     = models.CharField(max_length=200)
    