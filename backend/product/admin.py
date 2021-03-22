from django.contrib import admin

from .models import Product, UserFavorites

# Register your models here.
admin.site.register(Product)
admin.site.register(UserFavorites)