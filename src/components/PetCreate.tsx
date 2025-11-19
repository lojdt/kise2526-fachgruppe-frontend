import React, { useState } from "react";
import { createPet, type NewPet } from "../services/petService";

export default function PetCreate() {
    const [name, setName] = useState("");
    const [tag, setTag] = useState("");
    const [status, setStatus] = useState<"available" | "pending" | "sold">("available");
    const [photoUrl, setPhotoUrl] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const reset = () => {
        setName("");
        setTag("");
        setStatus("available");
        setPhotoUrl("");
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setMessage(null);

        const payload: NewPet = {
            name: name.trim(),
            status,
            tags: tag ? [{ name: tag }] : undefined,
            photoUrls: photoUrl ? [photoUrl] : undefined,
        };

        try {
            await createPet(payload);
            setMessage("Pet created successfully.");
            reset();
        } catch (err: unknown) {
            // sichere Behandlung von unbekannten Fehlern
            const msg = err instanceof Error ? err.message : String(err);
            setMessage(`Failed to create pet: ${msg || "Unknown error"}`);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="card">
            <h2>Add a Pet</h2>
            <form onSubmit={onSubmit} className="form">
                <label>
                    Name
                    <input value={name} onChange={(e) => setName(e.target.value)} required />
                </label>

                <label>
                    Tag
                    <input value={tag} onChange={(e) => setTag(e.target.value)} placeholder="optional" />
                </label>

                <label>
                    Status
                    <select
                        value={status}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            setStatus(e.target.value as "available" | "pending" | "sold")
                        }
                    >
                        <option value="available">available</option>
                        <option value="pending">pending</option>
                        <option value="sold">sold</option>
                    </select>
                </label>

                <label>
                    Photo URL
                    <input value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} placeholder="http://..." />
                </label>

                <div className="actions">
                    <button type="submit" className="primary" disabled={submitting}>
                        {submitting ? "Creating..." : "Create Pet"}
                    </button>
                </div>

                {message && <div className="message">{message}</div>}
            </form>
        </section>
    );
}