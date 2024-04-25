from django.contrib import admin
from myapi.models import User, Profile

# Register your models here.

class UserAdmin(admin.ModelAdmin):
    list_display = ['email', 'email']

class ProfileAdmin(admin.ModelAdmin):
    list_editable = ['first_name','last_name', 'verified']
    list_display = ['user', 'first_name', 'last_name', 'verified']


admin.site.register(User, UserAdmin)
admin.site.register(Profile, ProfileAdmin)

