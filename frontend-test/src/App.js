import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import AuthPage from './LoginRegister'; 
import TrangChu from './TrangChu';

function App() {
  return (
    <Router>
      <Header />
      <div style={{ marginTop: '100px' }}>
        <Routes>
          
          <Route path="/" element={<TrangChu />} />
          <Route path="/login" element={<AuthPage isLoginMode={true} />} />
          <Route path="/register" element={<AuthPage isLoginMode={false} />} />
        </Routes>
      </div>

    </Router>
  );
}

export default App;