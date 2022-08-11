from rest_framework import serializers
from .models import Product, ProductCategory, DeviceTypeCategory

BASE_URLS = ['http://localhost:8000/', 'http://127.0.0.1:8000/']
class ProductSerializer(serializers.ModelSerializer):    
    
    class Meta:
        model = Product
        fields = ('id', 'name', 'description', 'quantity', 'price', 'image', 'device_type_category', 'device_brand_category', 'part_type_category')

    def to_representation(self, instance):
        res = super().to_representation(instance)
        for BASE_URL in BASE_URLS:
            res['image'] = res['image'].replace(BASE_URL, '')
        return res

class ProductCategorySerializer(serializers.ModelSerializer):
    device_types = serializers.StringRelatedField(many=True)
    device_brands = serializers.StringRelatedField(many=True)
    part_types = serializers.StringRelatedField(many=True)

    class Meta:
        model = ProductCategory
        fields = ('name', 'device_types', 'device_brands', 'part_types')

    def to_representation(self, instance):
        res = super().to_representation(instance).copy()
        for i in list(res.keys()):
            if len(res[i]) == 0:
                res.pop(i)
        for i in list(res.keys()):
            if i != 'name':
                res['children'] = res.pop(i)
        return res

class ProductCategoryCountSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    products_count = serializers.IntegerField()