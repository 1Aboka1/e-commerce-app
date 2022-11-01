from rest_framework.routers import SimpleRouter
from e_commerce_app.views import user, shopping_session, catalog, order

routes = SimpleRouter()

routes.register(r'auth/login', user.LoginViewSet, basename='auth-login')
routes.register(r'auth/register', user.RegistrationViewSet, basename='auth-register')
routes.register(r'auth/refresh', user.RefreshViewSet, basename='auth-refresh')
routes.register(r'user', user.UserViewSet, basename='user')
routes.register('cart/shopping_session', shopping_session.ShoppingSessionViewSet, basename='shopping-session')
routes.register(r'cart/cart_item', shopping_session.CartItemViewSet, basename='cart-item')
routes.register(r'products', catalog.ProductViewSet, basename='products')
routes.register(r'order/order_instance', order.OrderViewSet, basename='order')
routes.register(r'order/order_item', order.OrderItemViewSet, basename='order-item')

urlpatterns = [
    *routes.urls
]
