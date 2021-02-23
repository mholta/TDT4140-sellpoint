# Generated by Django 3.1.6 on 2021-02-22 12:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_auto_20210222_1250'),
        ('product', '0009_product_email'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='email',
            field=models.ForeignKey(blank='True', default='tor.skonnord@gmail.com', on_delete=django.db.models.deletion.CASCADE, to='user.user'),
            preserve_default=False,
        ),
    ]