from time import pthread_getcpuclockid
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import CustomUserManager

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    modified_at = models.DateTimeField(default=timezone.now)
    phone = models.CharField(max_length=150, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name']

    def __str__(self):
        return self.first_name

class UserAddress(models.Model):
    address = models.CharField(max_length=150, blank=True)
    city = models.CharField(max_length=150, blank=True)
    postal_code = models.CharField(max_length=150, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    modified_at = models.DateTimeField(default=timezone.now)
    
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.user

class Discount(models.Model):
    name = models.CharField(max_length=150, blank=True)
    description = models.TextField(blank=True)
    discount_amount = models.IntegerField(default=-1)
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now)
    modified_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name

class ProductCategory(models.Model):
    name = models.CharField(max_length=150, unique=True)
    
    created_at = models.DateTimeField(default=timezone.now)
    modified_at = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return self.name
    
class DeviceTypeCategory(models.Model):
    name = models.CharField(max_length=150, unique=True)
    product_category = models.ForeignKey(ProductCategory, on_delete=models.CASCADE, related_name="device_types")
    def __str__(self):
        return self.name
    class Meta:
        verbose_name = _("Тип устройства")
        verbose_name_plural = _("Типы устройства")
        

class DeviceBrandCategory(models.Model):
    name = models.CharField(max_length=150, unique=True)
    product_category = models.ForeignKey(ProductCategory, on_delete=models.CASCADE, related_name="device_brands")
    def __str__(self):
        return self.name
    class Meta:
        verbose_name = _("Марка устройства")
        verbose_name_plural = _("Марки устройства")

class PartTypeCategory(models.Model):
    name = models.CharField(max_length=150, unique=True)
    product_category = models.ForeignKey(ProductCategory, on_delete=models.CASCADE, related_name="part_types")
    def __str__(self):
        return self.name
    class Meta:
        verbose_name = _("Тип запчасти")
        verbose_name_plural = _("Типы запчасти")

class Product(models.Model):
    name = models.CharField(max_length=150, blank=True)
    description = models.TextField(blank=True)
    price = models.IntegerField(default=-1)
    quantity = models.IntegerField(default=-1)
    image = models.ImageField(blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    modified_at = models.DateTimeField(default=timezone.now)

    device_type_category = models.ForeignKey(DeviceTypeCategory, on_delete=models.PROTECT, default=None, related_name='products')
    device_brand_category = models.ForeignKey(DeviceBrandCategory, on_delete=models.PROTECT, default=None, related_name='products')
    part_type_category = models.ForeignKey(PartTypeCategory, on_delete=models.PROTECT, default=None, related_name='products')

    discount = models.ForeignKey(Discount, on_delete=models.PROTECT, blank=True)    

    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        return self.name

class ShoppingSession(models.Model):
    total = models.IntegerField(default=0)
    created_at = models.DateTimeField(default=timezone.now)
    modified_at = models.DateTimeField(default=timezone.now)

    user = models.OneToOneField(CustomUser, primary_key=False, on_delete=models.CASCADE)

    def __str__(self):
        return self.user

class CartItem(models.Model):
    quantify = models.IntegerField(default=0)
    created_at = models.DateTimeField(default=timezone.now)
    modified_at = models.DateTimeField(default=timezone.now)

    session = models.ForeignKey(ShoppingSession, on_delete=models.CASCADE)
    product = models.OneToOneField(Product, primary_key=False, on_delete=models.CASCADE)

    def __str__(self):
        return self.product

class OrderDetail(models.Model):
    total = models.IntegerField(default=0)
    created_at = models.DateTimeField(default=timezone.now)
    modified_at = models.DateTimeField(default=timezone.now)
    status = models.BooleanField(default=False)
    expected_date = models.DateTimeField(default=timezone.now)

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.user

class OrderItem(models.Model):
    quantity = models.IntegerField(default=0)
    created_at = models.DateTimeField(default=timezone.now)
    modified_at = models.DateTimeField(default=timezone.now)

    product = models.OneToOneField(Product, primary_key=False, on_delete=models.CASCADE)
    order = models.ForeignKey(OrderDetail, on_delete=models.CASCADE)

    def __str__(self):
        return self.product
