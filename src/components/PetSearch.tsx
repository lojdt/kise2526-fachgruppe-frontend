import { useEffect, useState } from "react";
import { type Pet, searchPets } from "../services/petService";

export default function PetSearch() {
    const [name, setName] = useState("");
    const [status, setStatus] = useState<"" | "available" | "pending" | "sold">("");
    const [pets, setPets] = useState<Pet[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPets = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await searchPets({ name: name.trim(), status: status || undefined });
            setPets(result);
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            setError(msg || "Failed to fetch pets");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // initial load
        fetchPets();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className="card">
            <h2>Search Pets</h2>

            <div className="form-row">
                <label>
                    Name:
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Partial or full name"
                    />
                </label>

                <label>
                    Status:
                    <select value={status} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value as "" | "available" | "pending" | "sold")}>
                        <option value="">Any</option>
                        <option value="available">available</option>
                        <option value="pending">pending</option>
                        <option value="sold">sold</option>
                    </select>
                </label>

                <div className="actions">
                    <button onClick={fetchPets} className="primary">
                        Search
                    </button>
                </div>
            </div>

            <div className="results">
                {loading && <div className="muted">Loading...</div>}
                {error && <div className="error">{error}</div>}

                {!loading && pets.length === 0 && <div className="muted">No pets found.</div>}

                <ul className="pet-list">
                    {pets.map((p) => (
                        <li key={p.id} className="pet-item">
                            <div className="pet-header">
                                <strong>{p.name || "<no name>"}</strong>
                                <span className={`status ${p.status || "unknown"}`}>{p.status || "unknown"}</span>
                            </div>

                            <div className="pet-body">
                                <div className="pet-field">ID: {p.id}</div>
                                {p.tags && p.tags.length > 0 && (
                                    <div className="pet-field">Tags: {p.tags.map((t) => t.name).join(", ")}</div>
                                )}
                                {p.photoUrls && p.photoUrls.length > 0 && (
                                    <div className="photo-row">
                                        {p.photoUrls.slice(0, 3).map((u, i) => (
                                            <img key={i} src={u} alt={`photo-${i}`} className="pet-photo" />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}