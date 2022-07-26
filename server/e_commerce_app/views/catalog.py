from django.db.models import Count
from e_commerce_app.models import Product, Category, ProductCategory, SubCategory 
from e_commerce_app.serializers import CategorySerializer, ProductCategorySerializer, ProductSerializer, SubCategorySerializer 
from rest_framework import generics, viewsets, status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from drf_multiple_model.mixins import FlatMultipleModelMixin
import json
from django.contrib.postgres.search import TrigramSimilarity
from rest_framework.permissions import AllowAny

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

class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    permission_classes = (AllowAny,)
    http_method_names = ['get']
    queryset = Product.objects.all()

    def list(self, request):
        request_dict = self.request.query_params
        if '0' in request_dict.keys():
            request_query_params_str = self.request.query_params.get('0')
            filters = json.loads(request_query_params_str)
            response_data = Product.objects.all().filter(id__in=filters)
            serializer = self.get_serializer(response_data, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        elif 'filters' in request_dict.keys() or 'keywords' in request_dict.keys():
            filters = json.loads(request_dict['filters'])
            keywords = request_dict['keywords']

            if len(filters) == 0 and len(keywords) == 0:
                return Response(self.get_serializer(self.get_queryset(), many=True).data, status=status.HTTP_200_OK)

            response_qs = self.get_queryset()

            if len(filters) != 0:
                response_qs = response_qs.filter(subcategories__name__in=filters).distinct()
            if len(keywords) != 0:
                response_qs.annotate(similarity=TrigramSimilarity('name', keywords)).filter(similarity__gt=0.01).order_by('-similarity')
            serializer = self.get_serializer(response_qs, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            raise Exception('no filters, keywords and \'0\'')
    
class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    permission_classes = (AllowAny,)
    queryset = Category.objects.all()
    http_method_names = ['get']
                
class SubCategoryViewSet(viewsets.ModelViewSet):
    serializer_class = SubCategorySerializer
    permission_classes = (AllowAny,)
    queryset = SubCategory.objects.all()
    http_method_names = ['get']

    def list(self, request):
        qs = SubCategory.objects.annotate(Count('product'))
        serializer = self.get_serializer(qs, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

class ProductCategoryViewSet(generics.ListAPIView):
    serializer_class = ProductCategorySerializer
    queryset = ProductCategory.objects.all()
    paginatation_class = None
    http_method_names = ['get']
