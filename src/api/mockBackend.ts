// In-memory mock backend that implements the POST /pet and GET /pet/{petId} semantics.
// Simulates small network delay and returns Promises similar to fetch-based APIs.

import { type Pet } from './petTypes';

let currentId = 1000;
const store = new Map<number, Pet>();

function delay<T>(ms: number, value: T): Promise<T> {
  return new Promise((res) => setTimeout(() => res(value), ms));
}

// Initialize with one sample pet (helps verify GET)
export function initializeMockBackend() {
  const sample: Pet = {
    id: ++currentId,
    name: 'buddy',
    photoUrls: ['https://image.geo.de/30150772/t/4G/v3/w1440/r0/-/wolfhund-jpg--86015-.jpg'],
    status: 'available',
    category: { id: 1, name: 'Dogs' },
    tags: [{ id: 1, name: 'cute' }],
  };
  store.set(sample.id!, sample);
}

// POST /pet -> create new pet and return it (200)
export async function createPet(payload: Omit<Pet, 'id'>): Promise<Pet> {
  if (!payload || !payload.name || !payload.photoUrls || payload.photoUrls.length === 0) {
    // Simulate 405 Invalid input per YAML (but we'll throw)
    return Promise.reject({ status: 405, message: 'Invalid input: name and photoUrls are required' });
  }

  const id = ++currentId;
  const pet: Pet = { ...payload, id };
  store.set(id, pet);

  // simulate network delay
  return delay(400, pet);
}

// GET /pet/{petId} -> return pet or 404
export async function getPetById(petId: number): Promise<Pet> {
  if (!Number.isFinite(petId)) {
    return Promise.reject({ status: 400, message: 'Invalid ID supplied' });
  }
  const pet = store.get(petId);
  if (!pet) {
    return Promise.reject({ status: 404, message: 'Pet not found' });
  }
  return delay(300, pet);
}

// Expose a helper to list all stored pets (useful for debugging)
export function listAllPets() {
  return Array.from(store.values());
}
