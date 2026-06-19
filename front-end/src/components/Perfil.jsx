import { useAuth } from '../contexts/AuthContext';
import { usePets } from '../contexts/PetContext';
import { useNavigate } from 'react-router-dom';
import MobileHeader from './layout/MobileHeader';
import BottomNav from './BottomNav';
import PetCard from './PetCard';
import { Link } from 'react-router-dom';

export default function Perfil() {
  const { user, logout, loading } = useAuth();
  const { getUserPets } = usePets();
  const meusPets = getUserPets();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/login');
  };

  // Enquanto carrega os dados do usuário, exibe uma mensagem de carregamento
  if (loading) {
    return (
      <div className="app-container">
        <MobileHeader title="Perfil" showBack={false} />
        <main className="main-content">
          <p>Carregando perfil...</p>
        </main>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="app-container">
      <MobileHeader title="Perfil" showBack={false} />
      <main className="main-content">
        <div className="profile-header">
          <div className="profile-avatar-large">
            <img src={user?.foto || '/img/avatar.png.jpg'} alt="Dono" />
          </div>
          <h2>{user?.name || 'Fernanda Travassos'}</h2>
          <p>{user?.phone || '(83) 99609-8944'}</p>
        </div>

        <div className="profile-menu">
          <Link to="#" className="menu-item">
            <span className="material-icons">person</span>
            <span>Editar Perfil</span>
          </Link>
          <Link to="#" className="menu-item">
            <span className="material-icons">lock</span>
            <span>Privacidade</span>
          </Link>
          <Link to="#" className="menu-item">
            <span className="material-icons">help</span>
            <span>Ajuda</span>
          </Link>
          <Link to="#" className="menu-item" onClick={handleLogout}>
            <span className="material-icons">logout</span>
            <span>Sair</span>
          </Link>
        </div>

        <section className="meus-pets-section">
          <div className="section-header">
            <h3>Meus Pets</h3>
            <Link to="/cadastro-pet" className="add-pet-btn">
              <span className="material-icons">add_circle</span> Cadastrar Pet
            </Link>
          </div>
          <div className="row g-3" id="meusPetsContainer">
            {meusPets.length === 0 && (
              <p>Você ainda não cadastrou nenhum pet.</p>
            )}
            {meusPets.map(pet => (
              <div key={pet.id} className="col-6 position-relative">
                <PetCard pet={pet} />
                <Link to={`/editar-pet/${pet.id}`} className="btn-edit-pet" title="Editar pet">
                  <span className="material-icons">edit</span>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
      <BottomNav />
    </div>
  );
}