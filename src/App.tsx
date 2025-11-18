import { useState } from 'react';
import type { Pet } from './types';
import { api } from './services/api';
import './App.css';

function App() {
  const [searchId, setSearchId] = useState('');
  const [searchedPet, setSearchedPet] = useState<Pet | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [createForm, setCreateForm] = useState<{
    name: string;
    photoUrls: string;
    status: 'available' | 'pending' | 'sold';
  }>({
    name: '',
    photoUrls: '',
    status: 'available',
  });
  const [createError, setCreateError] = useState<string | null>(null);
  const [createdPet, setCreatedPet] = useState<Pet | null>(null);

  const handleSearch = async () => {
    if (!searchId) return;
    try {
      const pet = await api.getPetById(Number(searchId));
      setSearchedPet(pet);
      setSearchError(null);
    } catch (err) {
      setSearchError(err instanceof Error ? err.message : 'Failed to search pet');
      setSearchedPet(null);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const pet: Pet = {
        name: createForm.name,
        photoUrls: createForm.photoUrls.split(',').map(url => url.trim()),
        status: createForm.status,
      };
      const newPet = await api.addPet(pet);
      setCreatedPet(newPet);
      setCreateError(null);
      setCreateForm({ name: '', photoUrls: '', status: 'available' });
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : 'Failed to create pet');
    }
  };

  return (
    <div className="app">
      <h1>Pet Store Frontend</h1>

      <section>
        <h2>Search Pet by ID</h2>
        <div>
          <input
            type="number"
            placeholder="Enter Pet ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        {searchError && <p style={{ color: 'red' }}>{searchError}</p>}
        {searchedPet && (
          <div>
            <h3>{searchedPet.name}</h3>
            <p>Status: {searchedPet.status}</p>
            {searchedPet.photoUrls.length > 0 && (
              <img src={searchedPet.photoUrls[0]} alt={searchedPet.name} width="100" />
            )}
          </div>
        )}
      </section>

      <section>
        <h2>Create New Pet</h2>
        <form onSubmit={handleCreate}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={createForm.name}
              onChange={(e) => setCreateForm(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          <div>
            <label>Photo URLs (comma separated):</label>
            <input
              type="text"
              value={createForm.photoUrls}
              onChange={(e) => setCreateForm(prev => ({ ...prev, photoUrls: e.target.value }))}
              required
            />
          </div>
          <div>
            <label>Status:</label>
            <select
              value={createForm.status}
              onChange={(e) => setCreateForm(prev => ({ ...prev, status: e.target.value as 'available' | 'pending' | 'sold' }))}
            >
              <option value="available">Available</option>
              <option value="pending">Pending</option>
              <option value="sold">Sold</option>
            </select>
          </div>
          <button type="submit">Create Pet</button>
        </form>
        {createError && <p style={{ color: 'red' }}>{createError}</p>}
        {createdPet && (
          <div>
            <h3>Created: {createdPet.name}</h3>
            <p>ID: {createdPet.id}</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
