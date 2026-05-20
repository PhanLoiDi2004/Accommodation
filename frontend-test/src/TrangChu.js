import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TrangChu() {
    const [dsPhongTro, setDsPhongTro] = useState([]);

    // Tự động chạy và gọi API khi người dùng vừa mở trang chủ lên
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/phongtro/')
            .then(response => {
                setDsPhongTro(response.data); // Đổ mảng dữ liệu từ Django vào State
            })
            .catch(error => {
                console.error("Lỗi khi lấy dữ liệu phòng trọ:", error);
            });
    }, []);

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>
                DANH SÁCH PHÒNG TRỌ ĐANG CHO THUÊ
            </h2>

            {dsPhongTro.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#666' }}>
                    Hiện chưa có phòng trọ nào được đăng, hoặc server Backend đang tắt.
                </p>
            ) : (
                <div style={styles.grid}>
                    {dsPhongTro.map(phong => (
                        <div key={phong.id} style={styles.card}>
                            {/* Tiêu đề phòng */}
                            <h3 style={styles.title}>{phong.tieu_de}</h3>
                            
                            {/* Thông tin chi tiết */}
                            <p style={styles.text}><b>📍 Địa chỉ:</b> {phong.dia_chi}, {phong.quan_huyen}</p>
                            <p style={styles.text}><b>📐 Diện tích:</b> {phong.dien_tich} m²</p>
                            <p style={styles.price}>💰 Giá thuê: {Number(phong.gia_thue).toLocaleString('vi-VN')} VNĐ/tháng</p>
                            
                            {/* Trạng thái phòng */}
                            <div style={{ marginTop: '15px', textAlign: 'right' }}>
                                <span style={{
                                    ...styles.badge,
                                    backgroundColor: phong.trang_thai === 'con_phong' ? '#28a745' : '#dc3545'
                                }}>
                                    {phong.trang_thai === 'con_phong' ? 'Còn phòng' : 'Hết phòng'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// Style CSS inline viết nhanh để giao diện nhìn xịn sò ngay lập tức
const styles = {
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '25px',
        padding: '10px'
    },
    card: {
        border: '1px solid #e0e0e0',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
        backgroundColor: '#fff',
        transition: 'transform 0.2s'
    },
    title: {
        fontSize: '18px',
        color: '#007bff',
        marginTop: '0',
        marginBottom: '15px',
        lineHeight: '1.4'
    },
    text: {
        margin: '8px 0',
        color: '#555',
        fontSize: '14px'
    },
    price: {
        margin: '12px 0 0 0',
        color: '#d9534f',
        fontWeight: 'bold',
        fontSize: '16px'
    },
    badge: {
        color: 'white',
        padding: '5px 10px',
        borderRadius: '5px',
        fontSize: '12px',
        fontWeight: 'bold'
    }
};

export default TrangChu;