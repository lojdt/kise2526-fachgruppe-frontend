import { useState } from 'react';
import { mockPetStoreAPI } from '../api/mockPetStore';
import type { Pet } from '../api/types';
import './SearchPet.css';

export default function SearchPet() {
  const [petId, setPetId] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [pet, setPet] = useState<Pet | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPet(null);

    try {
      const id = parseInt(petId);
      if (isNaN(id) || id <= 0) {
        throw new Error('Please enter a valid pet ID');
      }

      const foundPet = await mockPetStoreAPI.getPetById(id);
      setPet(foundPet);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status?: string) => {
    switch (status) {
      case 'available':
        return 'status-badge status-available';
      case 'pending':
        return 'status-badge status-pending';
      case 'sold':
        return 'status-badge status-sold';
      default:
        return 'status-badge';
    }
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
            placeholder="Enter pet ID"
            min="1"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {error && (
        <div className="error-message">
          <h3>✗ Error</h3>
          <p>{error}</p>
        </div>
      )}

      {pet && (
        <div className="pet-details">
          <div className="pet-header">
            <h3>{pet.name}</h3>
            <span className={getStatusBadgeClass(pet.status)}>
              {pet.status || 'unknown'}
            </span>
          </div>

          <div className="pet-info">
            <div className="info-row">
              <strong>ID:</strong>
              <span>{pet.id}</span>
            </div>

            {pet.category && (
              <div className="info-row">
                <strong>Category:</strong>
                <span>{pet.category.name}</span>
              </div>
            )}

            {pet.tags && pet.tags.length > 0 && (
              <div className="info-row">
                <strong>Tags:</strong>
                <div className="tags-container">
                  {pet.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {pet.photoUrls && pet.photoUrls.length > 0 && (
              <div className="info-row">
                <strong>Photos:</strong>
                <div className="photo-gallery">
                  {pet.photoUrls.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`${pet.name} ${index + 1}`}
                      className="pet-photo"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200?text=No+Image';
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

