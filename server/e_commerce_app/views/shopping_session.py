from e_commerce_app.models import CartItem, ShoppingSession
from e_commerce_app.serializers import ShoppingSessionSerializer, CartItemSerializer
from rest_framework import viewsets, filters, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.http import QueryDict

class ShoppingSessionViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    http_method_names = ['get', 'delete']
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['modified_at']
    ordering = ['modified_at']
    serializer_class = ShoppingSessionSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            return ShoppingSession.objects.all()
    
    def get_object(self):
        lookup_field_value = self.kwargs[self.lookup_field]

        obj = ShoppingSession.objects.get(user__id=lookup_field_value)
        self.check_object_permissions(self.request, obj)

        return obj

    def destroy(self, request, *args, **kwargs):
        lookup_field_value = self.kwargs[self.lookup_field]
        CartItem.objects.filter(session__id=lookup_field_value).delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

class CartItemViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    http_method_names = ['post', 'delete', 'patch']
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['created_at']
    serializer_class = CartItemSerializer
    queryset = CartItem.objects.all()

    def create(self, request, *args, **kwargs):
        request_body = QueryDict('', mutable=True)
        request_body.update(self.request.data)
        serializer = self.get_serializer(data=request_body)

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def destroy(self, request, *args, **kwargs):
        lookup_field_value = self.kwargs[self.lookup_field]
        self.get_queryset().get(id=lookup_field_value).delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

    def patch(self, request, *args, **kwargs):
        request_body = QueryDict('', mutable=True)
        request_body.update(self.request.data)
        serializer = self.get_serializer(data=request_body)
        serializer.is_valid(raise_exception=True)

        lookup_field_value = self.kwargs[self.lookup_field]
        obj = self.get_queryset().get(id=lookup_field_value)

        obj.update(quantity=serializer['quantity'])
        obj.save()
        
        return Response(status=status.HTTP_202_ACCEPTED)
