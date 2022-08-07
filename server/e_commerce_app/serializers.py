from rest_framework import serializers
from .models import Product
import math

BASE_URL = 'http://localhost:8000/'
class ProductSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Product
        fields = ('id', 'name', 'description', 'quantity', 'price', 'image')

    def to_representation(self, instance):
        res = super().to_representation(instance)
        res['image'] = res['image'].replace(BASE_URL, '')
        return res
