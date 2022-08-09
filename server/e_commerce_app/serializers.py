from rest_framework import serializers
from .models import Product, ProductCategory

BASE_URL = 'http://localhost:8000/'
class ProductSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Product
        fields = ('id', 'name', 'description', 'quantity', 'price', 'image', 'device_type_category', 'device_brand_category', 'part_type_category')

    def to_representation(self, instance):
        res = super().to_representation(instance)
        res['image'] = res['image'].replace(BASE_URL, '')
        return res

class ProductCategorySerializer(serializers.ModelSerializer):
    device_types = serializers.StringRelatedField(many=True)
    device_brands = serializers.StringRelatedField(many=True)
    part_types = serializers.StringRelatedField(many=True)

    class Meta:
        model = ProductCategory
        fields = ('name', 'device_types', 'device_brands', 'part_types')