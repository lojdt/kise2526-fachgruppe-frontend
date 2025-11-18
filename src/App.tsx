import React, { useState } from 'react';
import './App.css';
import { PetForm, PetSearch, PetDisplay } from './components';
import { PetStoreApi, type Pet } from './api';

const api = new PetStoreApi();

function App() {
  const [createdPet, setCreatedPet] = useState<Pet | null>(null);
  const [searchedPet, setSearchedPet] = useState<Pet | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);

  const handleCreatePet = async (pet: Pet) => {
    setIsLoadingCreate(true);
    setError(null);
    try {
      const newPet = await api.pet.addPet(pet);
      setCreatedPet(newPet);
    } catch (e) {
      setError('Failed to create pet.');
      console.error(e);
    } finally {
      setIsLoadingCreate(false);
    }
  };

  const handleSearchPet = async (petId: number) => {
    setIsLoadingSearch(true);
    setError(null);
    setSearchedPet(null);
    try {
      const foundPet = await api.pet.getPetById(petId);
      setSearchedPet(foundPet);
    } catch (e) {
      setError(`Pet with ID ${petId} not found.`);
      console.error(e);
    } finally {
      setIsLoadingSearch(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pet Store Frontend</h1>
      </header>
      <main>
        <section className="pet-creation">
          <PetForm onSubmit={handleCreatePet} />
          {isLoadingCreate && <p>Creating pet...</p>}
          {createdPet && (
            <div className="result-card">
              <h3>Pet Created Successfully!</h3>
              <PetDisplay pet={createdPet} />
            </div>
          )}
        </section>

        <section className="pet-search-section">
          <PetSearch onSearch={handleSearchPet} />
          {isLoadingSearch && <p>Searching for pet...</p>}
          {error && <p className="error-message">{error}</p>}
          {searchedPet && (
            <div className="result-card">
              <h3>Search Result:</h3>
              <PetDisplay pet={searchedPet} />
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
