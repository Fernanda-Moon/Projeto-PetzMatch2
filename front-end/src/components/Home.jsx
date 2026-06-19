import { Link } from 'react-router-dom';
import Header from './layout/Header';
import BottomNav from './BottomNav';
import PetCard from './PetCard';
import { usePets } from '../contexts/PetContext';
import { useEffect } from 'react';

export default function Home() {
  const { pets } = usePets();
  const featuredPets = pets.slice(0, 6);

  useEffect(() => {
    // Bootstrap aka a logo do PetzMatch na página inicial.
    if (window.bootstrap) {
      const carouselElement = document.querySelector('#petCarousel');
      if (carouselElement) new window.bootstrap.Carousel(carouselElement);
    }
  }, []);

  const categorias = [
    { nome: 'Felinos', tipo: 'gato', img: 'gato2.png.png' },
    { nome: 'Cães', tipo: 'cachorro', img: 'pata.png.png' },
    { nome: 'Pássaros', tipo: 'passaro', img: 'passaro2.png.png' },
    { nome: 'Roedores', tipo: 'roedor', img: 'coelho2.png.png' },
    { nome: 'Peixes', tipo: 'peixe', img: 'peixe.png.png' },
    { nome: 'Répteis', tipo: 'reptil', img: 'cobra2.png.png' }
  ];

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <div id="petCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="/img/petzmatch.logo.jpeg" className="d-block w-100" alt="Banner" />
            </div>
          </div>
        </div>

        <section className="categories-section">
          <h3 className="section-title">Categorias</h3>
          <div className="categories-grid">
            {categorias.map(cat => (
              <Link key={cat.tipo} to={`/categoria/${cat.tipo}`} className="category-card">
                <img src={`/img/${cat.img}`} className="category-icon" alt={cat.nome} />
                <span>{cat.nome}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="pets-section">
          <h3 className="section-title">Pets próximos</h3>
          <div className="row g-3" id="featuredPetsContainer">
            {featuredPets.map(pet => <PetCard key={pet.id} pet={pet} />)}
            {featuredPets.length === 0 && <p>Nenhum pet cadastrado ainda. Cadastre seu primeiro pet!</p>}
          </div>
        </section>
      </main>
      <BottomNav />
    </div>
  );
}