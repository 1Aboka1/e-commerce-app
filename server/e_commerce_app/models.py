from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from mptt.models import TreeForeignKey, MPTTModel, TreeManager
from .managers import CustomUserManager, CategoryManager


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    modified_at = models.DateTimeField(default=timezone.now)
    phone = models.CharField(max_length=150, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)

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

class Product(models.Model):
    name = models.CharField(max_length=150, blank=True)
    description = models.TextField(blank=True)
    price = models.IntegerField(default=-1)
    quantity = models.IntegerField(default=-1)
    image = models.ImageField(blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    modified_at = models.DateTimeField(default=timezone.now)

    discount = models.ForeignKey(Discount, on_delete=models.PROTECT, blank=True)    

    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        return self.name

class ProductCategory(MPTTModel):
    name = models.CharField(max_length=150, unique=True)
    parent = TreeForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')
    
    created_at = models.DateTimeField(default=timezone.now)
    modified_at = models.DateTimeField(default=timezone.now)

    objects = CategoryManager()
    class MPTTMeta:
        order_insertion_by = ['name']
    
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