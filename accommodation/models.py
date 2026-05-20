from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('webmaster', 'Webmaster'),
        ('host', 'Chủ trọ'),
        ('tenant', 'Người dùng'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='tenant')
    phone = models.CharField(max_length=15, blank=True, null=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"


class PhongTro(models.Model):
    TRANG_THAI_CHOICES = (
        ('cho_duyet', 'Chờ duyệt'),
        ('da_duyet', 'Đã duyệt'),
        ('tu_choi', 'Từ chối'),
        ('an', 'Ẩn'),
    )

    chu_tro = models.ForeignKey(
        User, on_delete=models.CASCADE,
        related_name='phong_tro',
        limit_choices_to={'role': 'host'}
    )
    tieu_de = models.CharField(max_length=255)
    mo_ta = models.TextField()
    gia_thue = models.DecimalField(max_digits=12, decimal_places=0)
    dia_chi = models.CharField(max_length=500)
    quan_huyen = models.CharField(max_length=100)
    thanh_pho = models.CharField(max_length=100, default='TP.HCM')
    dien_tich = models.FloatField(help_text='m²')
    trang_thai = models.CharField(
        max_length=20, choices=TRANG_THAI_CHOICES, default='cho_duyet'
    )
    lat = models.FloatField(blank=True, null=True)
    lng = models.FloatField(blank=True, null=True)
    ngay_dang = models.DateTimeField(auto_now_add=True)
    ngay_cap_nhat = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-ngay_dang']

    def __str__(self):
        return self.tieu_de


class AnhPhongTro(models.Model):
    phong_tro = models.ForeignKey(
        PhongTro, on_delete=models.CASCADE, related_name='anh'
    )
    hinh_anh = models.ImageField(upload_to='phong_tro/')
    la_anh_chinh = models.BooleanField(default=False)
    thu_tu = models.IntegerField(default=0)

    class Meta:
        ordering = ['thu_tu']

    def __str__(self):
        return f"Ảnh {self.phong_tro.tieu_de}"


class BinhLuan(models.Model):
    phong_tro = models.ForeignKey(
        PhongTro, on_delete=models.CASCADE, related_name='binh_luan'
    )
    nguoi_dung = models.ForeignKey(
        User, on_delete=models.CASCADE,
        related_name='binh_luan',
        limit_choices_to={'role': 'tenant'}
    )
    noi_dung = models.TextField()
    danh_gia = models.IntegerField(
        default=5,
        choices=[(i, f'{i} sao') for i in range(1, 6)]
    )
    ngay_dang = models.DateTimeField(auto_now_add=True)
    ngay_cap_nhat = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-ngay_dang']
        unique_together = ('phong_tro', 'nguoi_dung')

    def __str__(self):
        return f"{self.nguoi_dung.username} - {self.phong_tro.tieu_de}"


class TinNhan(models.Model):
    phong_tro = models.ForeignKey(
        PhongTro, on_delete=models.CASCADE, related_name='tin_nhan'
    )
    nguoi_gui = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='tin_nhan_gui'
    )
    nguoi_nhan = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='tin_nhan_nhan'
    )
    noi_dung = models.TextField()
    thoi_gian = models.DateTimeField(auto_now_add=True)
    da_doc = models.BooleanField(default=False)

    class Meta:
        ordering = ['thoi_gian']

    def __str__(self):
        return f"{self.nguoi_gui} → {self.nguoi_nhan}: {self.noi_dung[:50]}"


class LuuPhong(models.Model):
    nguoi_dung = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='luu_phong'
    )
    phong_tro = models.ForeignKey(
        PhongTro, on_delete=models.CASCADE, related_name='duoc_luu'
    )
    ngay_luu = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('nguoi_dung', 'phong_tro')

    def __str__(self):
        return f"{self.nguoi_dung.username} lưu {self.phong_tro.tieu_de}"


class ThongBao(models.Model):
    LOAI_CHOICES = (
        ('duyet_tin', 'Duyệt tin'),
        ('tu_choi_tin', 'Từ chối tin'),
        ('binh_luan', 'Bình luận mới'),
        ('tin_nhan', 'Tin nhắn mới'),
        ('he_thong', 'Hệ thống'),
    )
    nguoi_nhan = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='thong_bao'
    )
    loai = models.CharField(max_length=20, choices=LOAI_CHOICES)
    tieu_de = models.CharField(max_length=255)
    noi_dung = models.TextField()
    da_doc = models.BooleanField(default=False)
    ngay_tao = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-ngay_tao']

    def __str__(self):
        return f"[{self.loai}] {self.tieu_de}"
