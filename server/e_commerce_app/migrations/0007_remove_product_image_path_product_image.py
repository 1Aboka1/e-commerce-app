# Generated by Django 4.0.6 on 2022-08-03 04:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('e_commerce_app', '0006_product_image_path'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='image_path',
        ),
        migrations.AddField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, upload_to=''),
        ),
    ]
