from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name, last_name=last_name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, first_name, last_name, password=None, **extra_fields):
        # Create a regular user first
        user = self.create_user(email, first_name, last_name, password, **extra_fields)
        
        # Set additional fields for a superuser
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)  # Store hashed password
    profile_photo = models.URLField(max_length=255, null=True, blank=True)  # Store profile photo URL as a string
    phone_number = models.CharField(max_length=15, null=True, blank=True)
    notification_preference = models.IntegerField(default=1)
    created_on = models.DateTimeField(auto_now_add=True)  # Store timestamp when the record is created

    # Add any other fields you may need

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['password', 'first_name', 'last_name']

    def __str__(self):
        return self.email
"""
class Expense(models.Model):
    title = models.CharField(max_length=50, blank=False, null=False)
    amount = models.DecimalField(max_digits=20, decimal_places=2, blank=False, null=False)  # Assuming two decimal places for currency
    type = models.CharField(max_length=50, default='expense', blank=False, null=False)
    date = models.DateField(blank=False, null=False)
    category = models.CharField(max_length=50, blank=False, null=False)
    description = models.CharField(max_length=200, blank=False, null=False)  # Adjusted maxLength to 200 for more flexibility
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Income(models.Model):
    title = models.CharField(max_length=50, blank=False, null=False)
    amount = models.DecimalField(max_digits=20, decimal_places=2, blank=False, null=False)
    type = models.CharField(max_length=50, default='income', blank=False, null=False)
    date = models.DateField(blank=False, null=False)
    category = models.CharField(max_length=50, blank=False, null=False)
    description = models.CharField(max_length=200, blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
"""

from django.db import models

class Transaction(models.Model):
    TRANSACTION_TYPE_CHOICES = [
        ('income', 'Income'),
        ('expense', 'Expense'),
    ]
    
    title = models.CharField(max_length=50)
    amount = models.DecimalField(max_digits=20, decimal_places=2)
    type = models.CharField(max_length=7, choices=TRANSACTION_TYPE_CHOICES)
    date = models.DateField()
    category = models.CharField(max_length=50)
    description = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.type.title()} - {self.title}"


