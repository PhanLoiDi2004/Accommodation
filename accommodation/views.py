from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status,viewsets,filters
from django.contrib.auth import authenticate
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.authtoken.models import Token 
from .models import PhongTro
from .serializers import UserSerializer,PhongTroSerializer

## Đăng Ký 
@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        user.set_password(request.data.get('password'))
        user.save()
        
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            "message": "Đăng ký thành công!",
            "token": token.key,
            "username": user.username
        }, status=status.HTTP_201_CREATED)
        

    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

## Đăng nhập
@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    
    if user:
        token, _ = Token.objects.get_or_create(user=user) 
        return Response({
            "message": "Đăng nhập thành công!",
            "token" : token.key,
            "role": user.role,
            "username": user.username
        }, status=status.HTTP_200_OK)
    return Response({"error": "Sai tài khoản hoặc mật khẩu"}, status=status.HTTP_401_UNAUTHORIZED)


## Hien thi phong tro
class PhongTroViewSet(viewsets.ModelViewSet):
    queryset = PhongTro.objects.all()
    serializer_class = PhongTroSerializer
    
    ## Tim kiem va loc theo quan huyen
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['quan_huyen', 'trang_thai']
    search_fields = ['tieu_de', 'mo_ta', 'dia_chi']
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']: 
            permission_classes = [AllowAny]       
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes] 
     
    def perform_create(self,serializer):
        # Tự động gán người đăng tin chính là User đang đăng nhập qua Token
        serializer.save(chu_tro=self.request.user)
        
    
