# Generated by Django 4.1 on 2022-10-23 14:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('e_commerce_app', '0004_alter_cartitem_product_alter_cartitem_session_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='shoppingsession',
            name='total',
        ),
        migrations.AlterField(
            model_name='cartitem',
            name='quantity',
            field=models.IntegerField(default=1),
        ),
    ]
