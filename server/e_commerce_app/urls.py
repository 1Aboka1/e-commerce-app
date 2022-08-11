from django.urls import path, include
from rest_framework.routers import DefaultRouter
from e_commerce_app import views

router = DefaultRouter()
router.register(r'products', views.ProductViewSet, basename='product')

urlpatterns = [
    path('', include(router.urls)),
    path('product_categories', views.ProductCategoryView.as_view(), name='productCategory'),
    path('product_category_count', views.ProductCategoryCountView.as_view(), name='productCategoryCount'),
    path('get_filtered_products', views.FilteredProductView.as_view(), name='filteredProducts'),
]
