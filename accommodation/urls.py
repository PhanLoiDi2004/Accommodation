from django.urls import path, include
from .views import register_user, login_user, PhongTroViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'phongtro', PhongTroViewSet, basename='phongtro')

urlpatterns = [
    path('',include(router.urls)),
    path('register/', register_user, name='register'),
    path('login/', login_user, name='login'),
]