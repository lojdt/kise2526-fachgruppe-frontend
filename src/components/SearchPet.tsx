import React, { useEffect, useState } from 'react';
import { getPetById, listPets } from '../services/petService';
import type { Pet } from '../api/petTypes';

export default function SearchPet() {
    const [idText, setIdText] = useState('');
    const [pet, setPet] = useState<Pet | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [busy, setBusy] = useState(false);
    const [all, setAll] = useState<Pet[]>([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        // load all pets for the browse list
        (async () => {
            const res = await listPets();
            setAll(res);
        })();
    }, []);

    const onSearch = async (e?: React.FormEvent) => {
        e?.preventDefault();
        setError(null);
        setPet(null);

        const id = Number(idText);
        if (!Number.isInteger(id) || id <= 0) {
            setError('Please enter a valid positive integer id.');
            return;
        }

        setBusy(true);
        try {
            const p = await getPetById(id);
            setPet(p);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError(String(err) || 'Pet not found');
            }
        } finally {
            setBusy(false);
            // refresh list
            const res = await listPets();
            setAll(res);
        }
    };

    const filtered = all.filter((p) => {
        if (!filter) return true;
        const s = filter.toLowerCase();
        return (p.name || '').toLowerCase().includes(s) || String(p.id).includes(s);
    });

    return (
        <section className="card">
            <h2>Search Pet (getById)</h2>

            <form onSubmit={onSearch} className="form">
                <label>
                    Pet ID
                    <input
                        type="number"
                        value={idText}
                        onChange={(e) => setIdText(e.target.value)}
                        placeholder="e.g. 1001"
                    />
                </label>
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    <button className="btn secondary" type="submit" disabled={busy}>
                        {busy ? 'Searching…' : 'Search'}
                    </button>
                    <button
                        type="button"
                        className="btn ghost"
                        onClick={() => {
                            setIdText('');
                            setPet(null);
                            setError(null);
                        }}
                    >
                        Clear
                    </button>
                </div>
            </form>

            {error && <div className="error">Error: {error}</div>}

            {pet && (
                <div className="result">
                    <h3>Found</h3>
                    <pre>{JSON.stringify(pet, null, 2)}</pre>
                </div>
            )}

            <hr style={{ margin: '16px 0' }} />

            <h3>Browse Pets</h3>
            <label>
                Filter by name or id
                <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="type to filter list" />
            </label>

            <div className="list">
                {filtered.length === 0 ? (
                    <div className="muted">No pets found.</div>
                ) : (
                    filtered.map((p) => (
                        <div key={p.id} className="list-item">
                            <div>
                                <strong>{p.name}</strong> <span className="muted">#{p.id}</span>
                                <div className="muted small">{p.status}</div>
                            </div>
                            <div>
                                <button
                                    className="btn small"
                                    onClick={() => {
                                        setIdText(String(p.id));
                                        setPet(p);
                                        setError(null);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                >
                                    Select
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}
