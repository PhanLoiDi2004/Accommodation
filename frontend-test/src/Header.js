import React from 'react';
import { Link,useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  // Lấy tên người dùng từ localStorage
  const username = localStorage.getItem('username');
  // Đăng xuất tài khoản 
  const handleLogout = () => {
    localStorage.clear(); 
    navigate('/');
    window.location.reload();
  };


  return (
    <nav style={styles.nav}>
      <div style={styles.leftSection}>
        <div style={styles.logo}>🏠</div>
        <span style={styles.brandName}>TÌM TRỌ OU</span>
      </div>

      <div style={styles.searchBar}>
        <input type="text" placeholder="Nhập nhà trọ cần tìm..." style={styles.input} />
        <button style={styles.searchBtn}>🔍</button>
      </div>

      <div style={styles.rightSection}>
        {username ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontWeight: 'bold', color: '#007bff' }}>Chào {username}!</span>
            <button onClick={handleLogout} style={styles.logoutBtn}>Đăng xuất</button>
          </div>
        ) : (
          <>
            <Link to="/login" style={styles.loginBtn}>Đăng nhập</Link>
            <Link to="/register" style={styles.registerBtn}>Đăng ký</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 5%', 
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    position: 'fixed',
    top: 0,
    left: 0,      
    right: 0,       
    height: '70px', 
    zIndex: 1000,
    boxSizing: 'border-box', 
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    flexShrink: 0, 
  },
  logo: {
    fontSize: '28px',
  },
  brandName: {
    fontWeight: 'bold',
    fontSize: '20px',
    color: '#007bff',
    whiteSpace: 'nowrap', 
  },
  searchBar: {
    display: 'flex',
    flex: '0 1 400px',
    border: '1px solid #ddd',
    borderRadius: '20px',
    overflow: 'hidden',
    margin: '0 20px', 
  },
  input: {
    flex: 1,
    border: 'none',
    padding: '8px 15px',
    outline: 'none',
    width: '100%',
  },
  rightSection: {
    display: 'flex',
    gap: '12px',
    flexShrink: 0,
  },
  loginBtn: {
    textDecoration: 'none', 
    border: '1px solid #007bff',
    color: '#007bff',
    padding: '8px 16px',
    borderRadius: '5px',
    fontSize: '14px',
    fontWeight: '500',
  },
  logoutBtn: {
    backgroundColor: '#007bff', 
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: '0.3s', 
  },
  registerBtn: {
    textDecoration: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '5px',
    fontSize: '14px',
    fontWeight: '500',
  }
};
export default Header;