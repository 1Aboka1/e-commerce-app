from rest_framework import viewsets, filters, status
from e_commerce_app.serializers import OrderSerializer, OrderItemSerializer
from e_commerce_app.models import CartItem, OrderDetail, OrderItem, ShoppingSession
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.http import QueryDict

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = OrderDetail.objects.all()

    def create(self, request, *args, **kwargs):
        request_body = QueryDict('', mutable=True)
        request_body.update(self.request.data)

        shopping_session_items_qs = CartItem.objects.all().filter(session__id=request_body['shopping_session'])


        request_body.pop('shopping_session')
        serializer = self.get_serializer(data=request_body)
        serializer.is_valid(raise_exception=True)
        order = serializer.save()
        
        for item in shopping_session_items_qs:
            OrderItem.objects.create(
                    quantity = item.quantity,
                    product = item.product,
                    order = OrderDetail.objects.get(id=order.id)
                    )
        return Response(status=status.HTTP_201_CREATED)

class OrderItemViewSet(viewsets.ModelViewSet):
    pass
