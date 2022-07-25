from django.shortcuts import render
from rest_framework import viewsets
from .serializers import UserSerializer
from .models import CustomUser


class UserView(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer