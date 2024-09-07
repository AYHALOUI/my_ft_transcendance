from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):

    # first_name = serializers.CharField(required=True, allow_blank=True)
    # last_name = serializers.CharField(required=True, allow_blank=True)
    # email = serializers.EmailField(required=True, allow_blank=False)
    # mobile_number = serializers.CharField(required=False, allow_blank=True)
    # username = serializers.CharField(required=True, allow_blank=False)
    # bio = serializers.CharField(required=False, allow_blank=True)
    # displayname = serializers.CharField(required=False, allow_blank=True)
    # # profile_picture = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'mobile_number', 'username', 'display_name','bio', 'profile_picture']
        extra_kwargs = {
            'profile_picture': {'required': False}
        }

# ----------------------------------------------------------------------------------