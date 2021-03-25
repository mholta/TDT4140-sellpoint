from django.db import models

# Create your models here.
class Category(models.Model):
  title = models.CharField( max_length=16, default="", unique=True)

  def __str__(self):
    return self.title
