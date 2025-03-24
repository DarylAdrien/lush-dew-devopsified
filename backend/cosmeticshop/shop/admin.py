from django.contrib import admin
from .models import Product ,UserRole
# Register your models here.
admin.site.register(Product)

class UserRoleAdmin(admin.ModelAdmin):
    list_display = ('user', 'role')  # Display user and role in the list view

admin.site.register(UserRole, UserRoleAdmin)