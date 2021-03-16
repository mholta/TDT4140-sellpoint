from django.db import models
import math

# Create your models here.
class Location(models.Model):

    longitude = models.FloatField(default=0)
    latitude = models.FloatField(default=0)

    def __str__(self):
        name = (str(self.longitude) + str(self.latitude))
        return name
    
    def distance_to(self, location):
        x_dist = self.longitude - location.longitude
        y_dist = self.latitude - location.latitude
        return math.sqrt(x_dist**2 + y_dist**2)
