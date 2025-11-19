import React, { useState } from 'react';
import { createPet } from '../services/petService';
import type { Pet } from '../api/petTypes';

export default function CreatePet() {
    const [name, setName] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [status, setStatus] = useState<'available' | 'pending' | 'sold'>('available');
    const [busy, setBusy] = useState(false);
    const [created, setCreated] = useState<Pet | null>(null);
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setCreated(null);

        if (!name.trim() || !photoUrl.trim()) {
            setError('Please provide name and a photo URL.');
            return;
        }

        setBusy(true);
        try {
            const payload: Omit<Pet, 'id'> = {
                name: name.trim(),
                photoUrls: [photoUrl.trim()],
                status,
            };
            const result = await createPet(payload);
            setCreated(result);
            setName('');
            setPhotoUrl('');
        } catch (err: any) {
            setError(err?.message || String(err));
        } finally {
            setBusy(false);
        }
    };

    return (
        <section className="card">
            <h2>Create Pet</h2>

            <form onSubmit={onSubmit} className="form">
                <label>
                    Name
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="doggie"
                        aria-label="Pet name"
                    />
                </label>

                <label>
                    Photo URL
                    <input
                        type="text"
                        value={photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)}
                        placeholder="https://example.com/pet.jpg"
                        aria-label="Photo url"
                    />
                </label>

                <label>
                    Status
                    <select value={status} onChange={(e) => setStatus(e.target.value as any)}>
                        <option value="available">available</option>
                        <option value="pending">pending</option>
                        <option value="sold">sold</option>
                    </select>
                </label>

                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    <button className="btn primary" type="submit" disabled={busy}>
                        {busy ? 'Creating…' : 'Create Pet'}
                    </button>
                    <button
                        className="btn ghost"
                        type="button"
                        onClick={() => {
                            setName('');
                            setPhotoUrl('');
                            setError(null);
                            setCreated(null);
                        }}
                    >
                        Reset
                    </button>
                </div>
            </form>

            {error && <div className="error">Error: {error}</div>}

            {created && (
                <div className="result">
                    <h3>Created</h3>
                    <pre>{JSON.stringify(created, null, 2)}</pre>
                </div>
            )}
        </section>
    );
}