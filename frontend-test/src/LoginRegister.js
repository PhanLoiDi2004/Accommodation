import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const AuthPage = ({ isLoginMode }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', password: '', role: 'tenant', phone: '' });
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isLoginMode ? 'http://127.0.0.1:8000/api/login/' : 'http://127.0.0.1:8000/api/register/';
        const dataToSend = isLoginMode 
            ? { username: formData.username, password: formData.password }
            : formData;
        
        try {
            const res = await axios.post(url, dataToSend);
            if (res.data.token) {
                localStorage.setItem('token', res.data.token);
            }

            
            localStorage.setItem('username', res.data.username);
            localStorage.setItem('user_role', res.data.role || 'tenant');
            
            
            setTimeout(() => {
                navigate('/');
                window.location.reload(); 
            }, 1000);
        } catch (err) {
            setMessage("Lỗi: " + (err.response?.data?.error || "Sai thông tin hoặc lỗi kết nối"));
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2>{isLoginMode ? 'ĐĂNG NHẬP' : 'ĐĂNG KÝ TÀI KHOẢN'}</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" placeholder="Tên đăng nhập" 
                        onChange={e => setFormData({...formData, username: e.target.value})} 
                        style={styles.input} required 
                    />
                    <input 
                        type="password" placeholder="Mật khẩu" 
                        onChange={e => setFormData({...formData, password: e.target.value})} 
                        style={styles.input} required 
                    />
                    
                    {!isLoginMode && (
                        <>
                            <input 
                                type="text" placeholder="Số điện thoại" 
                                onChange={e => setFormData({...formData, phone: e.target.value})} 
                                style={styles.input} 
                            />
                            <label style={{display:'block', marginBottom:'5px'}}>Bạn là ai?</label>
                            <select 
                                value={formData.role} 
                                onChange={e => setFormData({...formData, role: e.target.value})} 
                                style={styles.input}
                            >
                                <option value="tenant">Người thuê trọ</option>
                                <option value="host">Chủ nhà trọ</option>
                                <option value="webmaster">Cộng tác viên (Webmaster)</option>
                            </select>
                        </>
                    )}
                    
                    <button type="submit" style={styles.button}>
                        {isLoginMode ? 'Đăng Nhập' : 'Tạo tài khoản'}
                    </button>
                </form>
                {message && <p style={{color: 'blue', marginTop: '10px'}}>{message}</p>}
            </div>
        </div>
    );
};

const styles = {
    
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' },
    card: { padding: '30px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', borderRadius: '10px', width: '350px', textAlign: 'center' },
    input: { display: 'block', width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box' },
    button: { width: '100%', padding: '12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }
};

export default AuthPage;