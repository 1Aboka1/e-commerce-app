from django.urls import path, include
from e_commerce_app.views import catalog, order

urlpatterns = [
    # path('get_products_count', catalog.ProductsCountView.as_view(), name='productsCount'),
    # path('get_single_product/<pk>', catalog.SingleProductView.as_view(), name='singleProduct'),
    # path('get_single_products_categories', catalog.SingleProductCategoriesView.as_view(), name='singleProductCategory'),
    path('', include(('e_commerce_app.routers', 'core'), namespace='core-api')),
    path(r'order/pdf', order.UploadInvoiceImage.as_view(), name='uploadInvoiceImage'),
]
