from django.db import models
import math
from django.db.backends.signals import connection_created
from django.dispatch import receiver
from django.utils.crypto import get_random_string


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

# Create your models here.
class User(models.Model):
    #id = models.CharField(max_length=50, unique=True, primary_key=True)
    email = models.CharField(max_length=50,unique=True, blank=False)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=8)
    password = models.CharField(max_length=200)

    latitude = models.FloatField( null=True)
    longitude = models.FloatField( null=True)

    favorites = models

    # Weak security, but works for persistant login
    session = models.CharField(max_length=50, null=True)

    def update_session(self):
        self.session = get_random_string(length=32)
        self.save()
    
    def __str__(self):
        return self.email
    