from django.contrib import admin
from .models import CustomUser
from .models import UserAddress, Discount, Product, ShoppingSession, CartItem, OrderDetail, OrderItem, ProductCategory
from django.contrib.auth.admin import UserAdmin
from django.contrib.admin import ModelAdmin
from mptt.admin import DraggableMPTTAdmin
from .forms import CategoryChoiceField

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

class ProductCategoryConfig(DraggableMPTTAdmin):
    mptt_level_indent = 35
    fields = (
        'name',
        'parent',
        'is_greatest',
    )

class ProductConfig(ModelAdmin):
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == 'product_category':
            return CategoryChoiceField(queryset=ProductCategory.objects.filter(is_greatest=True))
        return super().formfield_for_foreignkey(db_field, request, **kwargs)
    
    
    

admin.site.register(ProductCategory, ProductCategoryConfig)
admin.site.register(CustomUser, UserAdminConfig)
admin.site.register(UserAddress)
admin.site.register(Discount)
admin.site.register(Product, ProductConfig)
admin.site.register(ShoppingSession)
admin.site.register(CartItem)
admin.site.register(OrderDetail)
admin.site.register(OrderItem)