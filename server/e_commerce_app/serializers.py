from rest_framework import serializers
from .models import Product, ProductCategory

class ProductSerializer(serializers.ModelSerializer):    
    id = serializers.ReadOnlyField()
    name = serializers.CharField(max_length=150)
    description = serializers.CharField(max_length=150)
    price = serializers.IntegerField()
    quantity = serializers.IntegerField()
    image = serializers.CharField(max_length=300)
    device_type_category = serializers.StringRelatedField(many=True)
    device_brand_category = serializers.StringRelatedField(many=True)
    part_type_category = serializers.StringRelatedField(many=True)

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

class SingleCategorySerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)