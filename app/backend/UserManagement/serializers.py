from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ['id', 'email', 'first_name', 'last_name', 'username', 'mobile_number', 'display_name', 'bio', 'profile_picture']
        read_only_fields = ['id', 'email']