import React, { useState } from 'react';
import type { Pet } from '../types/pet';
import { mockPetService } from '../services/mockPetService';

interface PetFormProps {
  onPetCreated: (pet: Pet) => void;
}

const PetForm: React.FC<PetFormProps> = ({ onPetCreated }) => {
  const [name, setName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newPet = await mockPetService.addPet({
      name,
      photoUrls: [photoUrl],
    });
    onPetCreated(newPet);
    setName('');
    setPhotoUrl('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h2 style={{ color: '#F55500' }}>Create Pet</h2>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="name" style={{ display: 'block', marginBottom: '5px', color: '#555555' }}>Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="photoUrl" style={{ display: 'block', marginBottom: '5px', color: '#555555' }}>Photo URL:</label>
        <input
          type="text"
          id="photoUrl"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
      </div>
      <button
        type="submit"
        style={{
          backgroundColor: '#F55500',
          color: 'white',
          padding: '10px 15px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Create Pet
      </button>
    </form>
  );
};

export default PetForm;