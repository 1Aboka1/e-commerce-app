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

class UserViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['modified_at']
    ordering = ['modified_at']

    def get_queryset(self):
        if self.request.user.is_superuser:
            return CustomUser.objects.all()
    
    def get_object(self):
        lookup_field_value = self.kwargs[self.lookup_field]

        obj = CustomUser.objects.get(id=lookup_field_value)
        self.check_object_permissions(self.request, obj)

        return obj

class LoginViewSet(viewsets.ModelViewSet, TokenObtainPairView):
   serializer_class = LoginSerializer
   permission_classes = (AllowAny,)
   http_method_names = ['post']

   def create(self, request, *args, **kwargs):
       request_body = QueryDict('', mutable=True)
       request_body.update(self.request.data)
       serializer = self.get_serializer(data=request_body)

       try:
           serializer.is_valid(raise_exception=True)
       except TokenError as e:
           raise InvalidToken(e.args[0])
       return Response(serializer.validated_data, status=status.HTTP_200_OK)

class RegistrationViewSet(viewsets.ModelViewSet, TokenObtainPairView):
    serializer_class = RegistrationSerializer
    permission_classes = (AllowAny,)
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        request_body = QueryDict('', mutable=True)
        request_body.update(self.request.data)
        serializer = self.get_serializer(data=request_body)

        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        ShoppingSession.objects.create(user=user)

        res = {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                }
        return Response({
            "user": serializer.data,
            "refresh": res["refresh"],
            "token": res["access"]
            }, status=status.HTTP_201_CREATED)

class RefreshViewSet(viewsets.ModelViewSet, TokenRefreshView):
    permission_classes = (AllowAny,)
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])
        return Response(serializer.validated_data, status=status.HTTP_200_OK)
