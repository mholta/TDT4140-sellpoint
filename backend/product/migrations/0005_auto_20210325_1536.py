# Generated by Django 3.1.6 on 2021-03-25 15:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0004_auto_20210325_1330'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.TextField(default=''),
        ),
    ]
