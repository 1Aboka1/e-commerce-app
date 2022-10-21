from rest_framework.routers import SimpleRouter
from e_commerce_app import views

routes = SimpleRouter()

routes.register(r'auth/login', views.LoginViewSet, basename='auth-login')
routes.register(r'auth/register', views.RegistrationViewSet, basename='auth-register')
routes.register(r'auth/refresh', views.RefreshViewSet, basename='auth-refresh')
routes.register(r'user', views.UserViewSet, basename='user')
routes.register('cart/shopping_session', views.ShoppingSessionViewSet, basename='shopping-session')
routes.register(r'cart/cart_item', views.CartItemViewSet, basename='cart-item')
routes.register(r'products', views.ProductViewSet, basename='products'),

urlpatterns = [
    *routes.urls
]
