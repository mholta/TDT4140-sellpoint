# Generated by Django 3.1.6 on 2021-02-15 15:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_id', models.CharField(default='', max_length=8, unique=True)),
                ('name', models.CharField(default='', max_length=16)),
                ('price', models.FloatField(default=0)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('owner', models.ForeignKey(blank='True', on_delete=django.db.models.deletion.CASCADE, to='user.user')),
            ],
        ),
    ]
