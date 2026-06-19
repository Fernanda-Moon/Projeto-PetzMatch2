import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirm, setConfirm] = useState('');
  const [phone, setPhone] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      if (login(email, password)) navigate('/home');
      else alert('E-mail ou senha inválidos');
    } else {
      if (password !== confirm) alert('Senhas não coincidem');
      else if (register(name, email, password, phone)) navigate('/home');
    }
  };

  const openModal = (loginMode) => {
    setIsLogin(loginMode);
    setModalOpen(true);
  };

  return (
    <div className="welcome-page">
      <div className="welcome-container">
        <div className="welcome-content">
          <h1 className="welcome-title">Bem-vindo ao PetzMatch!</h1>
          <div className="logo-welcome-page">
            <img src="/img/petzmatch.logo.jpeg" alt="Logo" />
          </div>
          <p className="welcome-subtitle">Encontre o par perfeito para seu pet</p>
          <div className="welcome-buttons">
            <button className="btn btn-primary btn-large" onClick={() => openModal(true)}>
              Entrar
            </button>
            <button className="btn btn-outline btn-large" onClick={() => openModal(false)}>
              Cadastrar
            </button>
          </div>
        </div>
      </div>

      {modalOpen && (
        <dialog open className="custom-modal">
          <div className="modal-content">
            <h2>{isLogin ? 'Entrar' : 'Cadastrar'}</h2>
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <>
                  <div className="form-group">
                    <label>Nome completo</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label>Telefone</label>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
                  </div>
                </>
              )}
              <div className="form-group">
                <label>E-mail</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Senha</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
              {!isLogin && (
                <div className="form-group">
                  <label>Confirmar senha</label>
                  <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required />
                </div>
              )}
              <button type="submit" className="btn btn-primary btn-block">
                {isLogin ? 'Entrar' : 'Cadastrar'}
              </button>
            </form>
            <button className="btn-close-modal" onClick={() => setModalOpen(false)}>Cancelar</button>
          </div>
        </dialog>
      )}
    </div>
  );
}