import { Link } from 'react-router-dom';

export default function PetCard({ pet }) {
  const primeiraFoto = pet.fotos && pet.fotos.length > 0 ? pet.fotos[0] : '/img/avatar.png.jpg';
  return (
    <div className="col-6">
      <Link to={`/detalhes/${pet.id}`} className="pet-card">
        <img src={primeiraFoto} alt={pet.nome} className="pet-card-img" />
        <div className="pet-card-body">
          <div className="pet-card-title">{pet.nome}</div>
          <div className="pet-card-location">
            <span className="material-icons" style={{ fontSize: '14px' }}>location_on</span>
            {pet.local}
          </div>
        </div>
      </Link>
    </div>
  );
}