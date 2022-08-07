from django.urls import path, include
from rest_framework.routers import DefaultRouter
from e_commerce_app import views

router = DefaultRouter()
router.register(r'products', views.ProductViewSet, basename='product')
router.register(r'product_categories', views.ProductCategoryViewSet, basename='productCategory')

urlpatterns = [
    path('', include(router.urls)),
]
