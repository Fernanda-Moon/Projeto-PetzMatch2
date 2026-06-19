import { useNavigate } from 'react-router-dom';

export default function MobileHeader({ title, showBack = true }) {
  const navigate = useNavigate();
  return (
    <header className="mobile-header">
      <div className="header-content">
        {showBack && (
          <button onClick={() => navigate(-1)} className="back-button" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <span className="material-icons">arrow_back</span>
          </button>
        )}
        <h1 className="logo">{title}</h1>
        <span></span>
      </div>
    </header>
  );
}