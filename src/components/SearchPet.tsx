import React, { useState } from 'react';
import type { Pet } from '../types/pet.types';
import { petApi } from '../services/petApi.service';
import './SearchPet.css';

interface SearchPetProps {
  onPetFound?: (pet: Pet) => void;
}

const SearchPet: React.FC<SearchPetProps> = ({ onPetFound }) => {
  const [petId, setPetId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pet, setPet] = useState<Pet | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setPet(null);
    setLoading(true);

    try {
      const id = parseInt(petId);

      if (isNaN(id) || id <= 0) {
        throw new Error('Please enter a valid pet ID');
      }

      const foundPet = await petApi.getPetById(id);
      setPet(foundPet);

      if (onPetFound) {
        onPetFound(foundPet);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to find pet');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setPetId('');
    setPet(null);
    setError(null);
  };

  return (
    <div className="search-pet-container">
      <h2>Search Pet by ID</h2>

      <form onSubmit={handleSearch} className="search-pet-form">
        <div className="search-input-group">
          <input
            type="number"
            value={petId}
            onChange={(e) => setPetId(e.target.value)}
            placeholder="Enter Pet ID (e.g., 1)"
            min="1"
            required
          />
          <button type="submit" disabled={loading} className="search-button">
            {loading ? 'Searching...' : 'Search'}
          </button>
          {pet && (
            <button type="button" onClick={handleClear} className="clear-button">
              Clear
            </button>
          )}
        </div>
      </form>

      {error && <div className="error-message">{error}</div>}

      {pet && (
        <div className="pet-details">
          <h3>Pet Details</h3>

          <div className="pet-detail-row">
            <span className="detail-label">ID:</span>
            <span className="detail-value">{pet.id}</span>
          </div>

          <div className="pet-detail-row">
            <span className="detail-label">Name:</span>
            <span className="detail-value">{pet.name}</span>
          </div>

          {pet.category && (
            <div className="pet-detail-row">
              <span className="detail-label">Category:</span>
              <span className="detail-value">{pet.category.name}</span>
            </div>
          )}

          {pet.status && (
            <div className="pet-detail-row">
              <span className="detail-label">Status:</span>
              <span className={`detail-value status-${pet.status}`}>
                {pet.status}
              </span>
            </div>
          )}

          {pet.tags && pet.tags.length > 0 && (
            <div className="pet-detail-row">
              <span className="detail-label">Tags:</span>
              <div className="tags-container">
                {pet.tags.map((tag) => (
                  <span key={tag.id} className="tag">
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {pet.photoUrls && pet.photoUrls.length > 0 && (
            <div className="pet-detail-row">
              <span className="detail-label">Photos:</span>
              <div className="photos-container">
                {pet.photoUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`${pet.name} ${index + 1}`}
                    className="pet-photo"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/150?text=No+Image';
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPet;

