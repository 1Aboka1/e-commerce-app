from rest_framework.routers import SimpleRouter
from e_commerce_app import views

routes = SimpleRouter()

routes.register(r'auth/login', views.LoginViewSet, basename='auth-login')
routes.register(r'auth/register', views.RegistrationViewSet, basename='auth-register')
routes.register(r'auth/refresh', views.RefreshViewSet, basename='auth-refresh')
routes.register(r'user', views.UserViewSet, basename='user')
routes.register(r'cart/shopping_session', views.ShoppingSessionViewSet, basename='shopping-session')

urlpatterns = [
    *routes.urls
]
