from django.urls import path, include
from e_commerce_app.views import catalog, order

urlpatterns = [
    path('product_categories', catalog.ProductCategoryView.as_view(), name='productCategory'),
    path('product_category_count', catalog.ProductCategoryCountView.as_view(), name='productCategoryCount'),
    path('get_filtered_products', catalog.FilteredProductView.as_view(), name='filteredProducts'),
    path('get_products_count', catalog.ProductsCountView.as_view(), name='productsCount'),
    path('get_single_product/<pk>', catalog.SingleProductView.as_view(), name='singleProduct'),
    path('get_single_products_categories', catalog.SingleProductCategoriesView.as_view(), name='singleProductCategory'),
    path('', include(('e_commerce_app.routers', 'core'), namespace='core-api')),
    path(r'order/pdf', order.UploadInvoiceImage.as_view(), name='uploadInvoiceImage'),
]
