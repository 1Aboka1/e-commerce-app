# Generated by Django 4.1 on 2022-11-10 14:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('e_commerce_app', '0009_alter_orderitem_product'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orderdetail',
            name='total',
        ),
    ]