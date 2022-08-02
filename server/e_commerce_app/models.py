from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_superuser(self, email, first_name, password, **other_fields):

        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        return self.create_user(email, first_name, password, **other_fields)

    def create_user(self, email, first_name, password, **other_fields):

        if not email:
            raise ValueError(_('You must provide an email address'))

        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name, **other_fields)
        user.set_password(password)
        user.save()
        return user


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
        return self.user_name

class UserAddress(models.Model):
    address = models.CharField(max_length=150, blank=True)
    city = models.CharField(max_length=150, blank=True)
    postal_code = models.CharField(max_length=150, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    modified_at = models.DateTimeField(default=timezone.now)
    
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.user

class ProductCategory(models.Model):
    name = models.CharField(max_length=150, blank=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    modified_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name

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
    image = models.ImageField()
    created_at = models.DateTimeField(default=timezone.now)
    modified_at = models.DateTimeField(default=timezone.now)

    category = models.ForeignKey(ProductCategory, on_delete=models.PROTECT)
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