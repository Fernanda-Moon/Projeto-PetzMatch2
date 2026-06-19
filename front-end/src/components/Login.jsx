import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/home');
    } else {
      alert('E-mail ou senha inválidos');
    }
  };

  return (
    <div className="welcome-page">
      <div className="welcome-container">
        <div className="welcome-content login-content">
          <div className="logo-welcome-page">
            <img src="/img/petzmatch.logo.jpeg" alt="PetzMatch Logo" />
          </div>
          <h1 className="welcome-title">🐾 PetzMatch</h1>
          <p className="welcome-subtitle">Encontre o par perfeito para seu pet</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu@email.com"
              />
            </div>
            <div className="form-group">
              <label>Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="********"
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block btn-large">
              Entrar
            </button>
          </form>

          <div className="login-links">
            <Link to="#" className="forgot-password">Esqueceu a senha?</Link>
            <Link to="/register" className="register-link">Primeiro acesso &gt;</Link>
          </div>
        </div>
      </div>
    </div>
  );
}