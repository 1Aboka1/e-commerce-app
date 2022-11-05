from django.core.files.base import ContentFile
from rest_framework import viewsets, filters, status
from e_commerce_app.serializers import OrderSerializer, OrderItemSerializer, UploadInvoiceSerializer
from e_commerce_app.models import CartItem, OrderDetail, OrderItem, ShoppingSession
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.parsers import FileUploadParser, MultiPartParser
from rest_framework import views
from django.http import QueryDict
from django.core.files.storage import default_storage
import base64

class OrderViewSet(viewsets.ModelViewSet):
    permission_classes = (AllowAny,)
    http_method_names = ['get', 'post']
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['created_at']
    serializer_class = OrderSerializer
    queryset = OrderDetail.objects.all()

    def create(self, request, *args, **kwargs):
        request_body = QueryDict('', mutable=True)
        request_body.update(self.request.data)

        shopping_session_items_qs = CartItem.objects.all().filter(session__id=request_body['shopping_session'])


        shopping_session_id = request_body.pop('shopping_session')[0]
        
        serializer = self.get_serializer(data=request_body)
        serializer.is_valid(raise_exception=True)
        order = serializer.save()
        
        for item in shopping_session_items_qs:
            OrderItem.objects.create(
                    quantity = item.quantity,
                    product = item.product,
                    order = OrderDetail.objects.get(id=order.id)
                    )

        CartItem.objects.filter(session__id=shopping_session_id).delete()

        return Response(order.id, status=status.HTTP_201_CREATED)

class OrderItemViewSet(viewsets.ModelViewSet):
    permission_classes = (AllowAny,)
    http_method_names = ['get', 'post']
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['created_at']
    serializer_class = OrderItemSerializer
    queryset = OrderItem.objects.all()

    def list(self, request, *args, **kwargs):
        order_id = self.request.query_params['0']
        qs = OrderItem.objects.filter(order__id=order_id)
        serializer = self.get_serializer(qs, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

class UploadInvoiceImage(views.APIView):
    parser_classes = (FileUploadParser,)

    def put(self, request, format=None):
        file = request.FILES['file']
        bytes_obj = file.file.read()
        format, imgstr = str(bytes_obj).split(';base64,')
        ext = format.split('/')[-1]

        data = ContentFile(base64.b64decode(imgstr))  
        file_name = "myphoto." + ext
        data = ContentFile(base64.b64decode(imgstr), name='upload.' + ext)

        file_name = default_storage.save(file_name, data)

        return Response(status=status.HTTP_202_ACCEPTED)
