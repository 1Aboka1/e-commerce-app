# Generated by Django 4.1 on 2022-08-08 09:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('e_commerce_app', '0008_productcategory_is_greatest'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='productcategory',
            name='is_greatest',
        ),
    ]
