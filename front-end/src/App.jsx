import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PetProvider } from './contexts/PetContext';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Explorar from './components/Explorar';
import Chat from './components/Chat';
import Perfil from './components/Perfil';
import CadastroPet from './components/CadastroPet';
import EditarPet from './components/EditarPet';
import DetalhesPet from './components/DetalhesPet';
import Categoria from './components/Categoria';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PetProvider>
          <Routes>
            {/* Redireciona a raiz para a tela de login */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/explorar" element={<Explorar />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/cadastro-pet" element={<CadastroPet />} />
            <Route path="/editar-pet/:id" element={<EditarPet />} />
            <Route path="/detalhes/:id" element={<DetalhesPet />} />
            <Route path="/categoria/:tipo" element={<Categoria />} />
          </Routes>
        </PetProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;