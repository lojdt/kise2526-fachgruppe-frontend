// Use central types derived from OpenAPI
import type { Pet as ApiPet } from '../api/petTypes';
import { createPet as mockCreatePet, listAllPets } from '../api/mockBackend';


export type Pet = ApiPet & { id: number | undefined };
export type NewPet = Omit<ApiPet, 'id'>;

/**
 * searchPets uses the in-memory mock backend's listAllPets and filters locally.
 * Supports optional name (substring, case-insensitive) and status filtering.
 */
export async function searchPets(params?: { name?: string; status?: string }): Promise<Pet[]> {
    const all = listAllPets();
    const name = params?.name?.trim().toLowerCase();
    const status = params?.status?.trim().toLowerCase();

    return all.filter((p) => {
        if (name) {
            const nm = (p.name || '').toLowerCase();
            if (!nm.includes(name)) return false;
        }
        if (status) {
            if (((p.status || '') as string).toLowerCase() !== status) return false;
        }
        return true;
    }) as Pet[];
}

/**
 * createPet delegates to the mock backend createPet implementation.
 */
export async function createPet(pet: NewPet): Promise<Pet> {
    // mockCreatePet already validates required fields and simulates delay
    return mockCreatePet(pet) as Promise<Pet>;
}