import { useState } from 'react';
import type { Pet } from '../types/pet';
import { petService } from '../services/petService';
import './SearchPet.css';

export function SearchPet() {
  const [petId, setPetId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pet, setPet] = useState<Pet | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPet(null);

    try {
      const id = parseInt(petId, 10);
      if (isNaN(id) || id < 1) {
        throw new Error('Please enter a valid pet ID (positive number)');
      }

      const foundPet = await petService.getPetById(id);
      setPet(foundPet);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to find pet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-pet">
      <h2>Search Pet by ID</h2>
      
      <form onSubmit={handleSearch}>
        <div className="search-form">
          <input
            type="number"
            value={petId}
            onChange={(e) => setPetId(e.target.value)}
            placeholder="Enter Pet ID"
            required
            min="1"
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {error && (
        <div className="message error">
          <strong>Error:</strong> {error}
        </div>
      )}

      {pet && (
        <div className="pet-details">
          <h3>Pet Details</h3>
          <div className="pet-card">
            <div className="pet-field">
              <strong>ID:</strong> {pet.id}
            </div>
            <div className="pet-field">
              <strong>Name:</strong> {pet.name}
            </div>
            <div className="pet-field">
              <strong>Status:</strong> 
              <span className={`status-badge status-${pet.status}`}>
                {pet.status}
              </span>
            </div>
            {pet.category && (
              <div className="pet-field">
                <strong>Category:</strong> {pet.category.name}
              </div>
            )}
            {pet.tags && pet.tags.length > 0 && (
              <div className="pet-field">
                <strong>Tags:</strong>
                <div className="tags">
                  {pet.tags.map((tag) => (
                    <span key={tag.id} className="tag">
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="pet-field">
              <strong>Photos:</strong>
              <div className="photo-urls">
                {pet.photoUrls.map((url, index) => (
                  <div key={index} className="photo-url-item">
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      Photo {index + 1}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
