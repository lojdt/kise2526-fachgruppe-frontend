import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Pet } from '../types';
import { api } from '../services/api';

const AddPetForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    tags: '',
    photoUrls: '',
    status: 'available' as const,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const pet: Pet = {
        name: formData.name,
        category: formData.category ? { name: formData.category } : undefined,
        tags: formData.tags ? formData.tags.split(',').map(name => ({ name: name.trim() })) : undefined,
        photoUrls: formData.photoUrls.split(',').map(url => url.trim()),
        status: formData.status,
      };

      await api.addPet(pet);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add pet');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <h1>Add New Pet</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="tags">Tags (comma separated):</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="photoUrls">Photo URLs (comma separated):</label>
          <input
            type="text"
            id="photoUrls"
            name="photoUrls"
            value={formData.photoUrls}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="available">Available</option>
            <option value="pending">Pending</option>
            <option value="sold">Sold</option>
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Pet'}
        </button>
      </form>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default AddPetForm;