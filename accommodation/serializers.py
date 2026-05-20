from rest_framework import serializers
from .models import User,PhongTro,AnhPhongTro

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'role', 'phone']
        extra_kwargs = {'password': {'write_only': True}} # Không hiện mật khẩu khi trả về JSON

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class AnhPhongTroSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnhPhongTro
        fields = '__all__'
        
class PhongTroSerializer(serializers.ModelSerializer):
    chu_tro_details = UserSerializer(source='chu_tro', read_only=True)
    anh_danh_sach = AnhPhongTroSerializer(many=True, read_only=True, source='anh')
    
    class Meta:
        model = PhongTro
        fields = '__all__' # Lấy toàn bộ các trường trong model của bạn
    
