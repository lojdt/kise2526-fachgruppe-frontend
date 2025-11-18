import React, { useState } from 'react';
import PetForm from './components/PetForm';
import PetSearch from './components/PetSearch';
import type { Pet } from './types/pet';

const App: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);

  const handlePetCreated = (pet: Pet) => {
    setPets([...pets, pet]);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ color: '#F55500', textAlign: 'center' }}>Pet Store</h1>
      <PetForm onPetCreated={handlePetCreated} />
      <PetSearch />
    </div>
  );
};

export default App;