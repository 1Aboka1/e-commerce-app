from rest_framework import serializers
from .models import Product, ProductCategory

BASE_URL = 'http://localhost:8000/'
class ProductSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Product
        fields = ('id', 'name', 'description', 'quantity', 'price', 'image')

    def to_representation(self, instance):
        res = super().to_representation(instance)
        res['image'] = res['image'].replace(BASE_URL, '')
        return res

class RecursiveField(serializers.Serializer):
    def to_representation(self, value):
        serializer = self.parent.parent.__class__(value, context=self.context)
        return serializer.data
class ProductCategorySerializer(serializers.ModelSerializer):
    children = RecursiveField(many=True)
    class Meta:
        model = ProductCategory
        fields = ('name', 'children')