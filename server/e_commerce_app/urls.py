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
    path('get_search_results', views.SearchResultsView.as_view(), name='searchResults'),
    path('get_products_count', views.ProductsCountView.as_view(), name='productsCount'),
    path('get_single_product/<pk>', views.SingleProductView.as_view(), name='singleProduct'),
    path('get_single_products_categories', views.SingleProductCategoriesView.as_view(), name='singleProductCategory'),
]