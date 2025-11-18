import React, { useState } from 'react';
import type { Pet, Category, Tag } from '../types/pet.types';
import { PetStatus } from '../types/pet.types';
import { petApi } from '../services/petApi.service';
import './CreatePet.css';

interface CreatePetProps {
  onPetCreated?: (pet: Pet) => void;
}

const CreatePet: React.FC<CreatePetProps> = ({ onPetCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    photoUrls: '',
    categoryId: '',
    categoryName: '',
    tagIds: '',
    tagNames: '',
    status: PetStatus.AVAILABLE
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      // Validate
      if (!formData.name.trim()) {
        throw new Error('Pet name is required');
      }

      if (!formData.photoUrls.trim()) {
        throw new Error('At least one photo URL is required');
      }

      // Parse photo URLs (comma-separated)
      const photoUrls = formData.photoUrls
        .split(',')
        .map(url => url.trim())
        .filter(url => url.length > 0);

      // Parse category
      const category: Category | undefined = formData.categoryName.trim()
        ? {
            id: formData.categoryId ? parseInt(formData.categoryId) : undefined,
            name: formData.categoryName.trim()
          }
        : undefined;

      // Parse tags (comma-separated names)
      const tagNames = formData.tagNames
        .split(',')
        .map(name => name.trim())
        .filter(name => name.length > 0);

      const tags: Tag[] | undefined = tagNames.length > 0
        ? tagNames.map((name, index) => ({ id: Date.now() + index, name }))
        : undefined;

      // Create pet
      const newPet: Omit<Pet, 'id'> = {
        name: formData.name.trim(),
        photoUrls,
        category,
        tags,
        status: formData.status
      };

      const createdPet = await petApi.addPet(newPet);

      setSuccess(`Pet "${createdPet.name}" successfully created with ID: ${createdPet.id}`);

      // Reset form
      setFormData({
        name: '',
        photoUrls: '',
        categoryId: '',
        categoryName: '',
        tagIds: '',
        tagNames: '',
        status: PetStatus.AVAILABLE
      });

      // Callback
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
    <div className="create-pet-container">
      <h2>Create New Pet</h2>

      <form onSubmit={handleSubmit} className="create-pet-form">
        <div className="form-group">
          <label htmlFor="name">Pet Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="e.g., Buddy"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="photoUrls">Photo URLs * (comma-separated)</label>
          <input
            type="text"
            id="photoUrls"
            name="photoUrls"
            value={formData.photoUrls}
            onChange={handleInputChange}
            placeholder="e.g., https://example.com/photo1.jpg, https://example.com/photo2.jpg"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="categoryName">Category Name</label>
          <input
            type="text"
            id="categoryName"
            name="categoryName"
            value={formData.categoryName}
            onChange={handleInputChange}
            placeholder="e.g., Dogs"
          />
        </div>

        <div className="form-group">
          <label htmlFor="tagNames">Tags (comma-separated)</label>
          <input
            type="text"
            id="tagNames"
            name="tagNames"
            value={formData.tagNames}
            onChange={handleInputChange}
            placeholder="e.g., friendly, cute, playful"
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
          >
            <option value={PetStatus.AVAILABLE}>Available</option>
            <option value={PetStatus.PENDING}>Pending</option>
            <option value={PetStatus.SOLD}>Sold</option>
          </select>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <button type="submit" disabled={loading} className="submit-button">
          {loading ? 'Creating...' : 'Create Pet'}
        </button>
      </form>
    </div>
  );
};

export default CreatePet;

