import { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import api from '../services/api';

const PetContext = createContext();

export function PetProvider({ children }) {
  const [pets, setPets] = useState([]);
  const { user } = useAuth();

  const loadAllPets = async () => {
    const response = await api.get('/pets');
    setPets(response.data);
  };

  useEffect(() => {
    loadAllPets();
  }, []);

  const addPet = async (petData) => {
    try {
      const response = await api.post('/pets', petData);
      await loadAllPets();
      return response.data.id;
    } catch (error) {
      console.error('Erro no addPet:', error.response?.data || error.message);
      throw error;
    }
  };

  const updatePet = async (id, updatedData) => {
    await api.put(`/pets/${id}`, updatedData);
    await loadAllPets();
    return true;
  };

  const getPetById = async (id) => {
    const response = await api.get(`/pets/${id}`);
    return response.data;
  };

  const getUserPets = () => {
    return pets.filter(pet => pet.userId === user?.id);
  };

  const getPetsByTipo = (tipo) => {
    return pets.filter(p => p.tipo.toLowerCase() === tipo.toLowerCase());
  };

  const refreshPets = loadAllPets;

  return (
    <PetContext.Provider value={{
      pets,
      addPet,
      updatePet,
      getPetById,
      getUserPets,
      getPetsByTipo,
      refreshPets
    }}>
      {children}
    </PetContext.Provider>
  );
}

export function usePets() {
  return useContext(PetContext);
}