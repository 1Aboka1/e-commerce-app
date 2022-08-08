from django.contrib import admin
from .models import CustomUser
from .models import UserAddress, Discount, Product, ShoppingSession, CartItem, OrderDetail, OrderItem, ProductCategory
from django.contrib.auth.admin import UserAdmin
from django.contrib.admin import ModelAdmin
from mptt.admin import DraggableMPTTAdmin
from .forms import CategoryChoiceField
from mptt.forms import TreeNodeChoiceField, TreeNodeMultipleChoiceField

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
    )

class ProductConfig(ModelAdmin):
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == 'product_category':
            obj = ProductCategory.objects.get(pk=1)
            return TreeNodeMultipleChoiceField(queryset=ProductCategory.objects.all())
#            return TreeNodeChoiceField(queryset=obj.get_descendants(), start_level=obj.level)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)
    
    #create multiple instances of fieldsets for each node of root_node
    
    
    

admin.site.register(ProductCategory, ProductCategoryConfig)
admin.site.register(CustomUser, UserAdminConfig)
admin.site.register(UserAddress)
admin.site.register(Discount)
admin.site.register(Product, ProductConfig)
admin.site.register(ShoppingSession)
admin.site.register(CartItem)
admin.site.register(OrderDetail)
admin.site.register(OrderItem)