from django.db.models import Count
from django.shortcuts import render
from django.db.models import Q
from .models import Product, ProductCategory, DeviceBrandCategory, DeviceTypeCategory, PartTypeCategory
from .serializers import ProductSerializer, ProductCategorySerializer, ProductCategoryCountSerializer, SingleCategorySerializer
from rest_framework import viewsets, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from drf_multiple_model.views import FlatMultipleModelAPIView
import json
from django.contrib.postgres.search import TrigramSimilarity

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
class FilteredProductView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        filterRequest = json.loads(self.request.query_params['0'])
        if isinstance(filterRequest, (list)):
            return Product.objects.all()

        device_type = filterRequest[str(DeviceTypeCategory._meta.verbose_name)]
        device_brand = filterRequest[str(DeviceBrandCategory._meta.verbose_name)]
        part_type = filterRequest[str(PartTypeCategory._meta.verbose_name)]
        
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

class SearchResultsView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        print(self.request.query_params['keywords'])
        return Product.objects.annotate(similarity=TrigramSimilarity('name', self.request.query_params['keywords'])).filter(similarity__gt=0.09).order_by('-similarity')

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