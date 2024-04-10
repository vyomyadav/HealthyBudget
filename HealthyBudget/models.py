from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, User

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
    
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(default='default.jpg', upload_to='profile_pics')

    def __str__(self):
        return f'{self.user.username} Profile'
    
    

