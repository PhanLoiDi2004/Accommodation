from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

# Bảng tạo user
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'role', 'is_staff')
    
    fieldsets = UserAdmin.fieldsets + (
        ('Phân quyền đồ án', {'fields': ('role',)}),
    )
    
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Phân quyền đồ án', {'fields': ('role',)}),
    )


admin.site.register(User, CustomUserAdmin)