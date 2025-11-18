import React, { useState } from 'react';
import './PetSearch.css';

interface PetSearchProps {
  onSearch: (petId: number) => void;
}

const PetSearch: React.FC<PetSearchProps> = ({ onSearch }) => {
  const [petId, setPetId] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = parseInt(petId, 10);
    if (!isNaN(id)) {
      onSearch(id);
    } else {
      alert('Please enter a valid Pet ID.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="pet-search">
      <h2>Search Pet by ID</h2>
      <div>
        <label htmlFor="petId">Pet ID:</label>
        <input
          type="number"
          id="petId"
          value={petId}
          onChange={(e) => setPetId(e.target.value)}
          required
        />
      </div>
      <button type="submit">Search</button>
    </form>
  );
};

export default PetSearch;
