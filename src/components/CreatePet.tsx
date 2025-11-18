import React, { useState } from 'react';
import { createPet } from '../api/mockBackend';
import type { Pet } from '../api/petTypes';

export default function CreatePet() {
  const [name, setName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [status, setStatus] = useState<'available' | 'pending' | 'sold'>('available');
  const [result, setResult] = useState<Pet | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!name.trim() || !photoUrl.trim()) {
      setError('Name and at least one photo URL are required.');
      return;
    }

    setLoading(true);
    try {
      const petPayload: Omit<Pet, 'id'> = {
        name: name.trim(),
        photoUrls: [photoUrl.trim()],
        status,
      };
      const created = await createPet(petPayload);
      setResult(created);
      setName('');
      setPhotoUrl('');
    } catch (err: any) {
      setError(err?.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card">
      <h2>Create Pet</h2>
      <form onSubmit={submit}>
        <label>
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="doggie" />
        </label>

        <label>
          Photo URL
          <input value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} placeholder="https://..." />
        </label>

        <label>
          Status
          <select value={status} onChange={(e) => setStatus(e.target.value as any)}>
            <option value="available">available</option>
            <option value="pending">pending</option>
            <option value="sold">sold</option>
          </select>
        </label>

        <div style={{ display: 'flex', gap: 12 }}>
          <button type="submit" className="btn primary" disabled={loading}>
            {loading ? 'Creating…' : 'Create Pet'}
          </button>
        </div>
      </form>

      {error && <div className="error">Error: {error}</div>}

      {result && (
        <div className="result">
          <h3>Created Pet</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </section>
  );
}
