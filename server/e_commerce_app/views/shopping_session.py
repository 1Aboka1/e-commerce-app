from django.db.models import Count
from django.shortcuts import render
from django.db.models import Q
from e_commerce_app.models import Product, ProductCategory, DeviceBrandCategory, DeviceTypeCategory, PartTypeCategory, CustomUser, CartItem, ShoppingSession
from e_commerce_app.serializers import ProductSerializer, ProductCategorySerializer, ProductCategoryCountSerializer, SingleCategorySerializer, UserSerializer, LoginSerializer, RegistrationSerializer, ShoppingSessionSerializer, CartItemSerializer
from rest_framework import generics, viewsets, filters, status
from rest_framework.generics import GenericAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from drf_multiple_model.mixins import FlatMultipleModelMixin
import json
from django.contrib.postgres.search import TrigramSimilarity
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.http import QueryDict
from rest_framework.decorators import action

class ShoppingSessionViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    http_method_names = ['get', 'delete']
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['modified_at']
    ordering = ['modified_at']
    serializer_class = ShoppingSessionSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            return ShoppingSession.objects.all()
    
    def get_object(self):
        lookup_field_value = self.kwargs[self.lookup_field]

        obj = ShoppingSession.objects.get(user__id=lookup_field_value)
        self.check_object_permissions(self.request, obj)

        return obj

    def destroy(self, request, *args, **kwargs):
        lookup_field_value = self.kwargs[self.lookup_field]
        CartItem.objects.filter(session__id=lookup_field_value).delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

class CartItemViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    http_method_names = ['post', 'delete', 'patch']
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['created_at']
    serializer_class = CartItemSerializer
    queryset = CartItem.objects.all()

    def create(self, request, *args, **kwargs):
        request_body = QueryDict('', mutable=True)
        request_body.update(self.request.data)
        serializer = self.get_serializer(data=request_body)

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def destroy(self, request, *args, **kwargs):
        lookup_field_value = self.kwargs[self.lookup_field]
        self.get_queryset().get(id=lookup_field_value).delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

    def patch(self, request, *args, **kwargs):
        request_body = QueryDict('', mutable=True)
        request_body.update(self.request.data)
        serializer = self.get_serializer(data=request_body)
        serializer.is_valid(raise_exception=True)

        lookup_field_value = self.kwargs[self.lookup_field]
        obj = self.get_queryset().get(id=lookup_field_value)

        obj.update(quantity=serializer['quantity'])
        obj.save()
        
        return Response(status=status.HTTP_202_ACCEPTED)
