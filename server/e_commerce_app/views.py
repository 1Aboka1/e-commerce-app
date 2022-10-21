from django.db.models import Count
from django.shortcuts import render
from django.db.models import Q
from .models import Product, ProductCategory, DeviceBrandCategory, DeviceTypeCategory, PartTypeCategory, CustomUser, CartItem, ShoppingSession
from .serializers import ProductSerializer, ProductCategorySerializer, ProductCategoryCountSerializer, SingleCategorySerializer, UserSerializer, LoginSerializer, RegistrationSerializer, ShoppingSessionSerializer, CartItemSerializer
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

#Overriding FlatMultipleModelMixin
class FlatMultipleModelMixinPatched(FlatMultipleModelMixin):
    def get_label(self, queryset, query_data):
        """
        Gets option label for each datum. Can be used for type identification
        of individual serialized objects
        """
        if query_data.get('label', False):
            return query_data['label']
        elif self.add_model_type:
            try:
                return queryset.model._meta.verbose_name
            except AttributeError:
                return query_data['queryset'].model._meta.verbose_name

class FlatMultipleModelAPIView(FlatMultipleModelMixinPatched, GenericAPIView):
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def get_queryset(self):
        return None

class ProductView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        qs = Product.objects.all()
        for i in range(len(qs)):
            qs[i].image = qs[i].image.name
        return qs
    
    
class FilteredProductView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def FilterRequest(self, filters):
        device_type = filters[str(DeviceTypeCategory._meta.verbose_name)]
        device_brand = filters[str(DeviceBrandCategory._meta.verbose_name)]
        part_type = filters[str(PartTypeCategory._meta.verbose_name)]
        
        if len(device_type) == 1 and len(device_brand) > 1 and len(part_type) > 1:
            return Product.objects.all().filter(
                Q(device_brand_category__name__in = device_brand) &
                Q(part_type_category__name__in = part_type)
            )
        elif len(device_type) > 1 and len(device_brand) == 1 and len(part_type) > 1:
            return Product.objects.all().filter(
                Q(device_type_category__name__in = device_type) &
                Q(part_type_category__name__in = part_type)
            )
        elif len(device_type) > 1 and len(device_brand) > 1 and len(part_type) == 1:
            return Product.objects.all().filter(
                Q(device_type_category__name__in = device_type) &
                Q(device_brand_category__name__in = device_brand)
            )
        elif len(device_type) == 1 and len(device_brand) == 1 and len(part_type) > 1:
            return Product.objects.all().filter(
                Q(part_type_category__name__in = part_type)
            )
        elif len(device_type) == 1 and len(device_brand) > 1 and len(part_type) == 1:
            return Product.objects.all().filter(
                Q(device_brand_category__name__in = device_brand)
            )
        elif len(device_type) > 1 and len(device_brand) == 1 and len(part_type) == 1:
            return Product.objects.all().filter(
                Q(device_type_category__name__in = device_type)
            )
        else:
            qs = Product.objects.all().filter(
                Q(device_type_category__name__in = device_type) &
                Q(device_brand_category__name__in = device_brand) &
                Q(part_type_category__name__in = part_type)
            )
            if qs.count() == 0:
                return Product.objects.all()
            else:
                return qs

    def get_queryset(self):
        if self.request.query_params.__contains__('filters'):
            filters = json.loads(self.request.query_params['filters'])
            keywords = self.request.query_params['keywords']
            if len(filters) == 0 and len(keywords) == 0:
                return Product.objects.all()
            elif len(filters) != 0 and len(keywords) == 0:
                return self.FilterRequest(filters)
            elif len(filters) == 0 and len(keywords) != 0:
                return Product.objects.annotate(similarity=TrigramSimilarity('name', self.request.query_params['keywords'])).filter(similarity__gt=0.09).order_by('-similarity')
            else:
                return self.FilterRequest(filters).annotate(similarity=TrigramSimilarity('name', self.request.query_params['keywords'])).filter(similarity__gt=0.09).order_by('-similarity')
                

class ProductCategoryView(generics.ListAPIView):
    serializer_class = ProductCategorySerializer
    queryset = ProductCategory.objects.all()
    paginatation_class = None

class ProductCategoryCountView(FlatMultipleModelAPIView):
    querylist = [
        {'queryset': DeviceBrandCategory.objects.all().annotate(products_count=Count('products')), 'serializer_class': ProductCategoryCountSerializer},
        {'queryset': DeviceTypeCategory.objects.all().annotate(products_count=Count('products')), 'serializer_class': ProductCategoryCountSerializer},
        {'queryset': PartTypeCategory.objects.all().annotate(products_count=Count('products')), 'serializer_class': ProductCategoryCountSerializer},
    ]

class ProductsCountView(APIView):
    def get(self, request, format=None):
        products_count = Product.objects.all().count()
        return Response(products_count)
    
class SingleProductView(generics.RetrieveAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

class SingleProductCategoriesView(FlatMultipleModelAPIView):
    def get_querylist(self):
        request_params = json.loads(self.request.query_params['0'])
        querylist = [
            {'queryset': DeviceTypeCategory.objects.filter(id=request_params["device_type_category"]), 'serializer_class': SingleCategorySerializer},
            {'queryset': DeviceBrandCategory.objects.filter(id=request_params["device_brand_category"]), 'serializer_class': SingleCategorySerializer},
            {'queryset': PartTypeCategory.objects.filter(id=request_params["part_type_category"]), 'serializer_class': SingleCategorySerializer},
        ]
        return querylist

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
        shopping_session = ShoppingSession.objects.create(total=0, user=user)

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

class ShoppingSessionViewSet(viewsets.ModelViewSet):
    permission_classes = (AllowAny,)
    http_method_names = ['get', 'put']
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

#    def create(self, request, *args, **kwargs):
#        serializer = self.get_serializer(data=request.data)
#        serializer.is_valid(raise_exception=True)
#        serializer.save()
#        print('CREATED')
#
#        return Response(serializer.validated_data, status=status.HTTP_201_CREATED)

    def update(self, request, pk=None, *args, **kwargs):
        lookup_field_value = self.kwargs[self.lookup_field]

        return Response(status=status.HTTP_206_PARTIAL_CONTENT)

class CartItemViewSet(viewsets.ModelViewSet):
    permission_classes = (AllowAny,)
    http_method_names = ['post']
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['created_at']
    serializer_class = CartItemSerializer

    def create(self, request, *args, **kwargs):
        request_body = QueryDict('', mutable=True)
        request_body.update(self.request.data)
        serializer = self.get_serializer(data=request_body)

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.validated_data, status=status.HTTP_201_CREATED)
