import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Pet } from '../types';
import { api } from '../services/api';

const PetList = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [status, setStatus] = useState('available');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.findPetsByStatus(status);
        setPets(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch pets');
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, [status]);

  return (
    <div>
      <h1>Pet Store</h1>
      <div>
        <label htmlFor="status">Filter by status:</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="available">Available</option>
          <option value="pending">Pending</option>
          <option value="sold">Sold</option>
        </select>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {pets.map((pet) => (
          <li key={pet.id}>
            <Link to={`/pet/${pet.id}`}>
              <h3>{pet.name}</h3>
              <p>Status: {pet.status}</p>
              {pet.photoUrls.length > 0 && (
                <img src={pet.photoUrls[0]} alt={pet.name} width="100" />
              )}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/add-pet">Add New Pet</Link>
    </div>
  );
};

export default PetList;