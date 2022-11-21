from django.contrib import admin
from .models import CustomUser, Discount, Product, ShoppingSession, CartItem, OrderDetail, OrderItem, Category, SubCategory
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

admin.site.index_title = 'Fastbuy'
admin.site.site_header = 'FastBuy Admin Panel'

admin.site.register(Category)
admin.site.register(SubCategory)
admin.site.register(CustomUser, UserAdminConfig)
admin.site.register(Discount)
admin.site.register(Product)
admin.site.register(ShoppingSession)
admin.site.register(CartItem)
admin.site.register(OrderDetail)
admin.site.register(OrderItem)
