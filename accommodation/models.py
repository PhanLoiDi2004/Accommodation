from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # Định nghĩa 4 nhóm quyền
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('webmaster', 'Webmaster'),
        ('host', 'Chủ trọ'),
        ('tenant', 'Người dùng'),
    )
    
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='tenant')
    phone = models.CharField(max_length=15, blank=True, null=True)

    def __str__(self):
        return f"{self.username} - {self.get_role_display()}"