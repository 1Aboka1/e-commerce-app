# Generated by Django 4.0.6 on 2022-08-02 07:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('e_commerce_app', '0002_rename_orderdetails_orderdetail'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='product',
            options={'ordering': ('-created_at',)},
        ),
    ]
