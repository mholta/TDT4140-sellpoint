from django.db import models

# Create your models here.
class Location(models.Model):
    longitude = models.FloatField(default=0)
    latitude = models.FloatField(default=0)

