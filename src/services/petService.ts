// Lightweight mock service that mimics POST /pet and GET /pet/{petId}.
// Stores data in localStorage so created pets persist across reloads during development.
// This keeps the interface similar to a real async API (returns Promises, simulates small delay).

import type { Pet } from '../api/petTypes';

const STORAGE_KEY = 'petstore:mock:pets';
const STORAGE_ID_KEY = 'petstore:mock:nextId';

function readStore(): Pet[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        return JSON.parse(raw) as Pet[];
    } catch {
        return [];
    }
}

function writeStore(items: Pet[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function getNextId(): number {
    const raw = localStorage.getItem(STORAGE_ID_KEY);
    let id = raw ? Number(raw) : 1000;
    id = id + 1;
    localStorage.setItem(STORAGE_ID_KEY, String(id));
    return id;
}

function delay<T>(ms: number, value: T): Promise<T> {
    return new Promise((res) => setTimeout(() => res(value), ms));
}

// Initialize with sample pet if empty
export function initializeMock() {
    const items = readStore();
    if (items.length === 0) {
        const id = getNextId();
        const sample: Pet = {
            id,
            name: 'doggie',
            photoUrls: ['https://placekitten.com/200/200'],
            status: 'available',
            category: { id: 1, name: 'Dogs' },
            tags: [{ id: 1, name: 'cute' }],
        };
        writeStore([sample]);
    }
}

// Create a new pet (mimics POST /pet -> returns created Pet)
export function createPet(payload: Omit<Pet, 'id'>): Promise<Pet> {
    if (!payload || !payload.name || !payload.photoUrls || payload.photoUrls.length === 0) {
        return Promise.reject({ status: 405, message: 'Invalid input: name and photoUrls are required' });
    }

    const items = readStore();
    const id = getNextId();
    const pet: Pet = { ...payload, id };
    items.push(pet);
    writeStore(items);

    // Simulate network delay
    return delay(300, pet);
}

// Get a pet by id (mimics GET /pet/{petId})
export function getPetById(petId: number): Promise<Pet> {
    if (!Number.isFinite(petId)) {
        return Promise.reject({ status: 400, message: 'Invalid ID supplied' });
    }
    const items = readStore();
    const p = items.find((x) => x.id === petId);
    if (!p) {
        return Promise.reject({ status: 404, message: 'Pet not found' });
    }
    return delay(200, p);
}

// Return all pets (helper for listing)
export function listPets(): Promise<Pet[]> {
    return delay(150, readStore());
}

// Clear store (development helper)
export function clearStore() {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_ID_KEY);
}