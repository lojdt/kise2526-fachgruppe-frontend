import { useState } from 'react';
import { mockPetStoreAPI } from '../api/mockPetStore';
import type { Pet, PetStatus, Category, Tag } from '../api/types';
import { PetStatus as PetStatusConst } from '../api/types';
import './CreatePet.css';

export default function CreatePet() {
  const [formData, setFormData] = useState({
    name: '',
    photoUrls: '',
    categoryName: '',
    tagNames: '',
    status: PetStatusConst.Available as PetStatus
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<Pet | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Parse photo URLs (comma-separated)
      const photoUrlArray = formData.photoUrls
        .split(',')
        .map(url => url.trim())
        .filter(url => url.length > 0);

      if (photoUrlArray.length === 0) {
        throw new Error('At least one photo URL is required');
      }

      // Parse category
      const category: Category | undefined = formData.categoryName.trim()
        ? { name: formData.categoryName.trim() }
        : undefined;

      // Parse tags (comma-separated)
      const tags: Tag[] | undefined = formData.tagNames.trim()
        ? formData.tagNames.split(',').map((tagName, index) => ({
            id: index + 1,
            name: tagName.trim()
          })).filter(tag => tag.name.length > 0)
        : undefined;

      const newPet: Omit<Pet, 'id'> = {
        name: formData.name,
        photoUrls: photoUrlArray,
        category,
        tags,
        status: formData.status
      };

      const createdPet = await mockPetStoreAPI.addPet(newPet);
      setSuccess(createdPet);

      // Reset form
      setFormData({
        name: '',
        photoUrls: '',
        categoryName: '',
        tagNames: '',
        status: PetStatusConst.Available as PetStatus
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-pet-container">
      <h2>Create New Pet</h2>

      <form onSubmit={handleSubmit} className="create-pet-form">
        <div className="form-group">
          <label htmlFor="name">Pet Name *</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            placeholder="Enter pet name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="photoUrls">Photo URLs * (comma-separated)</label>
          <textarea
            id="photoUrls"
            value={formData.photoUrls}
            onChange={(e) => setFormData({ ...formData, photoUrls: e.target.value })}
            required
            placeholder="https://example.com/photo1.jpg, https://example.com/photo2.jpg"
            rows={3}
          />
        </div>

        <div className="form-group">
          <label htmlFor="categoryName">Category</label>
          <input
            type="text"
            id="categoryName"
            value={formData.categoryName}
            onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
            placeholder="e.g., Dogs, Cats, Birds"
          />
        </div>

        <div className="form-group">
          <label htmlFor="tagNames">Tags (comma-separated)</label>
          <input
            type="text"
            id="tagNames"
            value={formData.tagNames}
            onChange={(e) => setFormData({ ...formData, tagNames: e.target.value })}
            placeholder="e.g., friendly, playful, energetic"
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as PetStatus })}
          >
            <option value={PetStatusConst.Available}>Available</option>
            <option value={PetStatusConst.Pending}>Pending</option>
            <option value={PetStatusConst.Sold}>Sold</option>
          </select>
        </div>

        <button type="submit" disabled={loading} className="submit-button">
          {loading ? 'Creating...' : 'Create Pet'}
        </button>
      </form>

      {success && (
        <div className="success-message">
          <h3>✓ Pet created successfully!</h3>
          <p><strong>ID:</strong> {success.id}</p>
          <p><strong>Name:</strong> {success.name}</p>
          <p><strong>Status:</strong> {success.status}</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          <h3>✗ Error</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

