# Generated by Django 4.0.6 on 2022-08-03 03:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('e_commerce_app', '0005_alter_discount_description_alter_product_description_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='image_path',
            field=models.CharField(blank=True, max_length=250),
        ),
    ]
