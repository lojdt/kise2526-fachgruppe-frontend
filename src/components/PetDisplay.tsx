import React from 'react';
import './PetDisplay.css';
import {Pet} from "../api";

interface PetDisplayProps {
  pet: Pet | null;
}

const PetDisplay: React.FC<PetDisplayProps> = ({ pet }) => {
  if (!pet) {
    return <div className="pet-display">No pet selected or found.</div>;
  }

  return (
    <div className="pet-display">
      <h2>Pet Details</h2>
      <p><strong>ID:</strong> {pet.id}</p>
      <p><strong>Name:</strong> {pet.name}</p>
      {pet.category && <p><strong>Category:</strong> {pet.category.name}</p>}
      <p><strong>Status:</strong> {pet.status}</p>
      {pet.photoUrls && pet.photoUrls.length > 0 && (
        <div>
          <strong>Photo(s):</strong>
          <div className="pet-photos">
            {pet.photoUrls.map((url: string, index: number) => (
              <img key={index} src={url} alt={`Pet photo ${index + 1}`} />
            ))}
          </div>
        </div>
      )}
      {pet.tags && pet.tags.length > 0 && (
        <p><strong>Tags:</strong> {pet.tags.map(tag => tag.name).join(', ')}</p>
      )}
    </div>
  );
};

export default PetDisplay;
