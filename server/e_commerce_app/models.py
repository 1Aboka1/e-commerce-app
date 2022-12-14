from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import CustomUserManager, ShoppingSessionManager

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

class Discount(models.Model):
    name = models.CharField(max_length=150, blank=True)
    description = models.TextField(blank=True)
    discount_amount = models.IntegerField(default=-1)
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now)
    modified_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=150, unique=True)
    
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

class SubCategory(models.Model):
    name = models.CharField(max_length=150, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='subcategories')
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
    subcategories = models.ManyToManyField(SubCategory)

    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        return self.name

class ShoppingSession(models.Model):
    created_at = models.DateTimeField(default=timezone.now)
    modified_at = models.DateTimeField(default=timezone.now)

    user = models.OneToOneField(CustomUser, primary_key=False, on_delete=models.PROTECT)

    objects = ShoppingSessionManager()

    def __str__(self):
        return str(self.user)

class CartItem(models.Model):
    quantity = models.IntegerField(default=1)
    created_at = models.DateTimeField(default=timezone.now)
    modified_at = models.DateTimeField(default=timezone.now)

    session = models.ForeignKey(ShoppingSession, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, primary_key=False, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.product)

class OrderDetail(models.Model):
    DELIVERY_TYPES = [
            ('COURIER', 'Курьер'),
            ('PICKUP', 'Самовывоз'),
            ]

    PAYMENT_OPTIONS = [
            ('KASPI', 'Kaspi перевод'),
            ('CASH', 'Наличные'),
            ]

    PAYMENT_ORDER_OPTIONS = [
            ('AT_PICKUP', 'После получения'),
            ('ONLINE', 'Через интернет'),
            ]

    PAYMENT_STATUS = [
            ('SUCCESSFUL', 'Оплачено'),
            ('PENDING', 'Ожидается'),
            ('UNPAID', 'Не оплачено'),
            ]

    created_at = models.DateTimeField(default=timezone.now)
    modified_at = models.DateTimeField(default=timezone.now)
    payment_status = models.CharField(max_length=30, choices=PAYMENT_STATUS, default='PENDING')
    payment_order = models.CharField(max_length=30, choices=PAYMENT_ORDER_OPTIONS, default='AT_PICKUP')
    completed_status = models.BooleanField(default=False)
    expected_date = models.DateTimeField(default=timezone.now)
    delivery_type = models.CharField(max_length=30, choices=DELIVERY_TYPES, default='COURIER')
    payment_option = models.CharField(max_length=30, choices=PAYMENT_OPTIONS, default='CASH')
    address = models.CharField(max_length=300, default='')
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def _get_total(self):
        qs = self.orderitem_set.filter(order__id=self.id)
        sum = 0
        for query in qs:
            sum += query.total
        return sum

    total = property(_get_total)

    def __str__(self):
        return str(self.id)

class OrderItem(models.Model):
    quantity = models.IntegerField(default=0)
    created_at = models.DateTimeField(default=timezone.now)
    modified_at = models.DateTimeField(default=timezone.now)
    product = models.ForeignKey(Product, primary_key=False, on_delete=models.CASCADE)
    order = models.ForeignKey(OrderDetail, on_delete=models.CASCADE)

    def _get_total(self):
        return self.quantity * self.product.price
    total = property(_get_total)

    def __str__(self):
        return str(self.product)
