from django.urls import path, include
from rest_framework.routers import SimpleRouter 
from e_commerce_app import views

urlpatterns = [
    path('product_categories', views.ProductCategoryView.as_view(), name='productCategory'),
    path('product_category_count', views.ProductCategoryCountView.as_view(), name='productCategoryCount'),
    path('get_filtered_products', views.FilteredProductView.as_view(), name='filteredProducts'),
    path('get_products_count', views.ProductsCountView.as_view(), name='productsCount'),
    path('get_single_product/<pk>', views.SingleProductView.as_view(), name='singleProduct'),
    path('get_single_products_categories', views.SingleProductCategoriesView.as_view(), name='singleProductCategory'),
    path('products', views.ProductView.as_view(), name='products'),
    path('', include(('e_commerce_app.routers', 'core'), namespace='core-api')),
]
