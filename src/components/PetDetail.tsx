import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Pet } from '../types';
import { api } from '../services/api';

const PetDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchPet = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.getPetById(Number(id));
        setPet(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch pet');
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [id]);

  const handleDelete = async () => {
    if (!pet?.id) return;
    try {
      await api.deletePet(pet.id);
      // Redirect to list or show success
      alert('Pet deleted successfully');
    } catch {
      alert('Failed to delete pet');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!pet) return <p>Pet not found</p>;

  return (
    <div>
      <h1>{pet.name}</h1>
      <p>Status: {pet.status}</p>
      {pet.category && <p>Category: {pet.category.name}</p>}
      {pet.tags && pet.tags.length > 0 && (
        <p>Tags: {pet.tags.map(tag => tag.name).join(', ')}</p>
      )}
      <div>
        {pet.photoUrls.map((url, index) => (
          <img key={index} src={url} alt={pet.name} width="200" />
        ))}
      </div>
      <button onClick={handleDelete}>Delete Pet</button>
      <Link to="/">Back to List</Link>
    </div>
  );
};

export default PetDetail;