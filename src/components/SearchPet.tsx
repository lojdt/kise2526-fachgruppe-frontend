import React, { useState } from 'react';
import { getPetById } from '../api/mockBackend';
import { Pet } from '../api/petTypes';

export default function SearchPet() {
  const [idStr, setIdStr] = useState('');
  const [pet, setPet] = useState<Pet | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const search = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);
    setPet(null);

    const id = Number(idStr);
    if (!Number.isInteger(id) || id <= 0) {
      setError('Please enter a valid positive integer id.');
      return;
    }

    setLoading(true);
    try {
      const found = await getPetById(id);
      setPet(found);
    } catch (err: any) {
      setError(err?.message || 'Pet not found');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card">
      <h2>Search Pet (getById)</h2>
      <form onSubmit={search}>
        <label>
          Pet ID
          <input value={idStr} onChange={(e) => setIdStr(e.target.value)} placeholder="e.g. 1001" />
        </label>

        <div style={{ display: 'flex', gap: 12 }}>
          <button type="submit" className="btn secondary" disabled={loading}>
            {loading ? 'Searching…' : 'Search'}
          </button>
        </div>
      </form>

      {error && <div className="error">Error: {error}</div>}

      {pet && (
        <div className="result">
          <h3>Found Pet</h3>
          <pre>{JSON.stringify(pet, null, 2)}</pre>
        </div>
      )}
    </section>
  );
}
