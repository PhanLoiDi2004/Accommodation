from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'role', 'phone']
        extra_kwargs = {'password': {'write_only': True}} # Không hiện mật khẩu khi trả về JSON

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user