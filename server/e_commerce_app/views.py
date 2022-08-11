from django.db.models import Count
from django.shortcuts import render
from django.db.models import Q
from .models import Product, ProductCategory, DeviceBrandCategory, DeviceTypeCategory, PartTypeCategory
from .serializers import ProductSerializer, ProductCategorySerializer, ProductCategoryCountSerializer
from rest_framework import viewsets, generics, mixins
from rest_framework.response import Response
from drf_multiple_model.views import FlatMultipleModelAPIView
import json

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
class FilteredProductView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        filterRequest = json.loads(self.request.query_params['0'])
        return Product.objects.all().filter(
                Q(device_type_category__name__in = filterRequest[DeviceTypeCategory._meta.verbose_name]) |
                Q(device_brand_category__name__in = filterRequest[DeviceBrandCategory._meta.verbose_name]) |
                Q(part_type_category__name__in = filterRequest[PartTypeCategory._meta.verbose_name])
            )

class ProductCategoryView(generics.ListAPIView):
    serializer_class = ProductCategorySerializer
    queryset = ProductCategory.objects.all()
    paginatation_class = None

    def get_queryset(self):
        qs = self.queryset.all()
        return qs

class ProductCategoryCountView(FlatMultipleModelAPIView):
    querylist = [
        {'queryset': DeviceBrandCategory.objects.all().annotate(products_count=Count('products')), 'serializer_class': ProductCategoryCountSerializer},
        {'queryset': DeviceTypeCategory.objects.all().annotate(products_count=Count('products')), 'serializer_class': ProductCategoryCountSerializer},
        {'queryset': PartTypeCategory.objects.all().annotate(products_count=Count('products')), 'serializer_class': ProductCategoryCountSerializer},
    ]