import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { user, register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    const success = await register(name, email, password, phone);
    if (success) {
      alert('Cadastro realizado com sucesso!');
      navigate('/home');
    } else {
      alert('E-mail já cadastrado. Use outro e-mail ou faça login.');
    }
  };

  return (
    <div className="welcome-page">
      <div className="welcome-container">
        <div className="welcome-content register-content">
          <div className="logo-welcome-page">
            <img src="/img/petzmatch.logo.jpeg" alt="PetzMatch Logo" />
          </div>
          <h1 className="welcome-title">🐾 Criar conta</h1>
          <p className="welcome-subtitle">Cadastre-se e encontre o match ideal para seu pet</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nome completo</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Seu nome completo"
              />
            </div>
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
              <label>Telefone (opcional)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(00) 00000-0000"
              />
            </div>
            <div className="form-group">
              <label>Criar senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="********"
              />
            </div>
            <div className="form-group">
              <label>Confirmar senha</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="********"
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block btn-large">
              Cadastrar
            </button>
          </form>

          <div className="register-actions">
            <Link to="/login" className="btn-cancel-small">Cancelar</Link>
            <Link to="/login" className="have-account-link">Possuo cadastro &gt;</Link>
          </div>
        </div>
      </div>
    </div>
  );
}