import { useParams } from 'react-router-dom';
import { usePets } from '../contexts/PetContext';
import MobileHeader from './layout/MobileHeader';
import BottomNav from './BottomNav';
import PetCard from './PetCard';
import { useState } from 'react';

export default function Categoria() {
  const { tipo } = useParams();
  const { getPetsByTipo } = usePets();
  const pets = getPetsByTipo(tipo);
  const [filtroSexo, setFiltroSexo] = useState('todos');

  const filteredPets = pets.filter(pet => {
    if (filtroSexo === 'todos') return true;
    // Converte o sexo do pet para o formato usado nos chips
    const sexoPet = pet.sexo === 'Macho' ? 'macho' : 'femea';
    return sexoPet === filtroSexo;
  });

  const nomeCategoria = {
    gato: 'Felinos',
    cachorro: 'Cães',
    passaro: 'Pássaros',
    roedor: 'Roedores',
    peixe: 'Peixes',
    reptil: 'Répteis'
  }[tipo] || 'Categoria';

  return (
    <div className="app-container">
      <MobileHeader title={nomeCategoria} />
      <main className="main-content">
        <div className="filter-chips">
          <span className={`chip ${filtroSexo === 'todos' ? 'active' : ''}`} onClick={() => setFiltroSexo('todos')}>Todos</span>
          <span className={`chip ${filtroSexo === 'macho' ? 'active' : ''}`} onClick={() => setFiltroSexo('macho')}>Macho</span>
          <span className={`chip ${filtroSexo === 'femea' ? 'active' : ''}`} onClick={() => setFiltroSexo('femea')}>Fêmea</span>
        </div>
        <div className="row g-3" id="categoriaPetsContainer">
          {filteredPets.map(pet => <PetCard key={pet.id} pet={pet} />)}
          {filteredPets.length === 0 && <p>Nenhum pet encontrado nesta categoria.</p>}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}