import React, { useState } from 'react';
import './PetForm.css';
import {Pet} from "../api";

interface PetFormProps {
  onSubmit: (pet: Pet) => void;
}

const PetForm: React.FC<PetFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [photoUrls, setPhotoUrls] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState<Pet.status>(Pet.status.AVAILABLE);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPet: Pet = {
      name,
      photoUrls: photoUrls.split(',').map(url => url.trim()),
      category: category ? { name: category } : undefined,
      tags: tags.split(',').map(tag => ({ name: tag.trim() })),
      status,
    };
    onSubmit(newPet);
    // Clear form
    setName('');
    setPhotoUrls('');
    setCategory('');
    setTags('');
    setStatus(Pet.status.AVAILABLE);
  };

  return (
    <form onSubmit={handleSubmit} className="pet-form">
      <h2>Create New Pet</h2>
      <div>
        <label htmlFor="name">Pet Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="photoUrls">Photo URLs (comma-separated):</label>
        <input
          type="text"
          id="photoUrls"
          value={photoUrls}
          onChange={(e) => setPhotoUrls(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="tags">Tags (comma-separated):</label>
        <input
          type="text"
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="status">Status:</label>
        <select id="status" value={status} onChange={(e) => setStatus(e.target.value as Pet.status)}>
          {Object.values(Pet.status).map((statusValue) => (
            <option key={statusValue} value={statusValue}>
              {statusValue}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Add Pet</button>
    </form>
  );
};

export default PetForm;
