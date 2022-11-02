from rest_framework import serializers
from rest_framework.response import Response
from rest_framework import status
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from .models import Product, ProductCategory, CustomUser, CartItem, ShoppingSession, OrderDetail, OrderItem
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.settings import api_settings
from django.contrib.auth.models import update_last_login
from django.core.exceptions import ObjectDoesNotExist

class ProductSerializer(serializers.ModelSerializer):    
    image = serializers.CharField()
    class Meta:
        model = Product
        fields = ('id', 'name', 'description', 'quantity', 'price', 'image', 'device_type_category', 'device_brand_category', 'part_type_category')

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

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'phone', 'first_name', 'last_name', 'is_active', 'created_at', 'modified_at']
        read_only_field = ['is_active', 'created_at', 'modified_at']

class LoginSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)

        data['user'] = UserSerializer(self.user).data
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        if api_settings.UPDATE_LAST_LOGIN:
            update_last_login(None, self.user)

        return data

class RegistrationSerializer(UserSerializer):
    password = serializers.CharField(max_length=200, write_only=True, required=True)
    email = serializers.EmailField(required=True, max_length=200)

    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'password', 'phone', 'first_name', 'last_name', 'is_active', 'created_at', 'modified_at']

    def create(self, validated_data):
        try:
            user = CustomUser.objects.get(email=validated_data['email'])
        except ObjectDoesNotExist:
            user = CustomUser.objects.create_user(**validated_data)
            return user

class CartItemSerializer(serializers.ModelSerializer):
    product_id = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all(), source='product')
    session_id = serializers.PrimaryKeyRelatedField(queryset=ShoppingSession.objects.all(), source='session')

    class Meta:
        model = CartItem
        fields = ['product_id', 'quantity', 'id', 'session_id']

class ShoppingSessionSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    items = CartItemSerializer(many=True)
    total = serializers.IntegerField()

    class Meta:
        model = ShoppingSession
        fields = ['id', 'total', 'user', 'items']

class OrderItemSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = OrderItem
        fields = ['quantity', 'created_at', 'modified_at', 'product', 'order']

class OrderSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())
    completed_status = serializers.BooleanField(read_only=True)
    expected_date = serializers.DateTimeField(read_only=True)
    payment_status = serializers.CharField(read_only=True)
    items = OrderItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = OrderDetail
        fields = ['user', 'address', 'total',  'payment_order', 'payment_option', 'delivery_type', 'expected_date', 'completed_status', 'payment_status', 'created_at', 'modified_at', 'items']
