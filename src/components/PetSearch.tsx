import React, { useState } from 'react';
import type { Pet } from '../types/pet';
import { mockPetService } from '../services/mockPetService';

const PetSearch: React.FC = () => {
  const [petId, setPetId] = useState('');
  const [pet, setPet] = useState<Pet | null>(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!petId) {
      setError('Please enter a pet ID');
      return;
    }

    try {
      const foundPet = await mockPetService.getPetById(Number(petId));
      if (foundPet) {
        setPet(foundPet);
        setError('');
      } else {
        setPet(null);
        setError('Pet not found');
      }
    } catch (err) {
      setError('Error searching for pet');
      setPet(null);
    }
  };

  return (
    <div>
      <h2 style={{ color: '#F55500' }}>Search Pet</h2>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="petId" style={{ display: 'block', marginBottom: '5px', color: '#555555' }}>Pet ID:</label>
        <input
          type="number"
          id="petId"
          value={petId}
          onChange={(e) => setPetId(e.target.value)}
          style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
      </div>
      <button
        onClick={handleSearch}
        style={{
          backgroundColor: '#F55500',
          color: 'white',
          padding: '10px 15px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        Search
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {pet && (
        <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '4px' }}>
          <h3 style={{ color: '#F55500' }}>{pet.name}</h3>
          <p style={{ color: '#555555' }}>ID: {pet.id}</p>
          <div>
            <h4 style={{ color: '#555555' }}>Photos:</h4>
            {pet.photoUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Photo of ${pet.name}`}
                style={{ maxWidth: '200px', marginRight: '10px', marginBottom: '10px' }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PetSearch;