import { useState } from 'react';
import type { Pet, PetStatus } from '../types/pet';
import { petService } from '../services/petService';
import './CreatePet.css';

interface CreatePetProps {
  onPetCreated?: (pet: Pet) => void;
}

export function CreatePet({ onPetCreated }: CreatePetProps) {
  const [name, setName] = useState('');
  const [photoUrls, setPhotoUrls] = useState('');
  const [status, setStatus] = useState<PetStatus>('available');
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<Pet | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Parse photo URLs (comma-separated)
      const urlArray = photoUrls.split(',').map(url => url.trim()).filter(url => url.length > 0);
      
      if (urlArray.length === 0) {
        throw new Error('At least one photo URL is required');
      }

      const petData: Omit<Pet, 'id'> = {
        name: name.trim(),
        photoUrls: urlArray,
        status,
        ...(categoryName.trim() && {
          category: { name: categoryName.trim() }
        })
      };

      const createdPet = await petService.addPet(petData);
      setSuccess(createdPet);
      
      // Reset form
      setName('');
      setPhotoUrls('');
      setStatus('available');
      setCategoryName('');

      if (onPetCreated) {
        onPetCreated(createdPet);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create pet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-pet">
      <h2>Create New Pet</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Pet Name *</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter pet name"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="photoUrls">Photo URLs * (comma-separated)</label>
          <input
            id="photoUrls"
            type="text"
            value={photoUrls}
            onChange={(e) => setPhotoUrls(e.target.value)}
            required
            placeholder="https://example.com/photo1.jpg, https://example.com/photo2.jpg"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as PetStatus)}
            disabled={loading}
          >
            <option value="available">Available</option>
            <option value="pending">Pending</option>
            <option value="sold">Sold</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            id="category"
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="e.g., dogs, cats, birds"
            disabled={loading}
          />
        </div>

        <button type="submit" disabled={loading} className="submit-button">
          {loading ? 'Creating...' : 'Create Pet'}
        </button>
      </form>

      {error && (
        <div className="message error">
          <strong>Error:</strong> {error}
        </div>
      )}

      {success && (
        <div className="message success">
          <strong>Success!</strong> Pet "{success.name}" created with ID: {success.id}
        </div>
      )}
    </div>
  );
}
