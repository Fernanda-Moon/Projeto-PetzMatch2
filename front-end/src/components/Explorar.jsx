import { useState } from 'react';
import { usePets } from '../contexts/PetContext';
import MobileHeader from './layout/MobileHeader';
import BottomNav from './BottomNav';
import PetCard from './PetCard';

export default function Explorar() {
  const { pets } = usePets();
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [filtroSexo, setFiltroSexo] = useState('todos');

  const filteredPets = pets.filter(pet => {
    if (filtroTipo !== 'todos' && pet.tipo.toLowerCase() !== filtroTipo) return false;
    if (filtroSexo !== 'todos' && pet.sexo !== filtroSexo) return false;
    return true;
  });

  return (
    <div className="app-container">
      <MobileHeader title="Explorar Pets" showBack={false} />
      <main className="main-content">
        <div className="filter-section">
          <select className="filter-select" value={filtroTipo} onChange={e => setFiltroTipo(e.target.value)}>
            <option value="todos">Todos os tipos</option>
            <option value="gato">Felinos</option>
            <option value="cachorro">Cães</option>
            <option value="passaro">Pássaros</option>
            <option value="roedor">Roedores</option>
            <option value="peixe">Peixes</option>
            <option value="reptil">Répteis</option>
          </select>
          <select className="filter-select" value={filtroSexo} onChange={e => setFiltroSexo(e.target.value)}>
            <option value="todos">Todos os sexos</option>
            <option value="Macho">Macho</option>
            <option value="Fêmea">Fêmea</option>
          </select>
        </div>
        <div className="row g-3" id="explorarPetsContainer">
          {filteredPets.map(pet => <PetCard key={pet.id} pet={pet} />)}
          {filteredPets.length === 0 && <p>Nenhum pet encontrado.</p>}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}