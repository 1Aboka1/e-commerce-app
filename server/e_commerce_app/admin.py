from django.contrib import admin
from .models import CustomUser, UserAddress, Discount, Product, ShoppingSession, CartItem, OrderDetail, OrderItem, ProductCategory, DeviceTypeCategory, DeviceBrandCategory, PartTypeCategory
from django.contrib.auth.admin import UserAdmin
from django.contrib.admin import ModelAdmin
class UserAdminConfig(UserAdmin):
    model = CustomUser
    search_fields = ('email', 'first_name',)
    list_filter = ('email', 'is_active', 'is_staff')
    ordering = ('-created_at',)
    list_display = ('email', 'first_name', 'is_active', 'is_staff')
    fieldsets = (
        (None, {'fields': ('email', 'first_name',)}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
        ('Personal', {'fields': ('phone',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'password1', 'password2', 'is_active', 'is_staff')}
         ),
    )

admin.site.register(ProductCategory)
admin.site.register(DeviceBrandCategory)
admin.site.register(DeviceTypeCategory)
admin.site.register(PartTypeCategory)

admin.site.register(CustomUser, UserAdminConfig)
admin.site.register(UserAddress)
admin.site.register(Discount)
admin.site.register(Product)
admin.site.register(ShoppingSession)
admin.site.register(CartItem)
admin.site.register(OrderDetail)
admin.site.register(OrderItem)