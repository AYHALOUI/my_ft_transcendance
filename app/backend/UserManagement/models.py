from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

class User(AbstractBaseUser):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    username = models.CharField(max_length=30, unique=True, default='')
    password = models.CharField(max_length=30)
    new_password = models.CharField(max_length=30, default='')
    confirm_password = models.CharField(max_length=30, default='')
    mobile_number = models.CharField(max_length=10, default='')
    display_name = models.CharField(max_length=30, default='')
    bio = models.TextField(default='')
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = BaseUserManager()

    def __str__(self):
        return self.email