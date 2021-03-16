from django.db import models
import math
from django.db.backends.signals import connection_created
from django.dispatch import receiver

# Create your models here.
class Location(models.Model):
    longitude = models.FloatField(default=0)
    latitude = models.FloatField(default=0)



@receiver(connection_created)
def extend_sqlite(connection=None, **kwargs):
    if connection.vendor == "sqlite":
        # sqlite doesn't natively support math functions, so add them
        cf = connection.connection.create_function
        cf('acos', 1, math.acos)
        cf('cos', 1, math.cos)
        cf('radians', 1, math.radians)
        cf('sin', 1, math.sin)
        cf('least', 2, min)
        cf('greatest', 2, max)