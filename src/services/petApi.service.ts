import type { Pet } from '../types/pet.types';
import { PetStatus, type PetStatusType } from '../types/pet.types';

// Mock data storage
let pets: Pet[] = [
  {
    id: 1,
    name: 'Buddy',
    photoUrls: ['https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=300'],
    category: { id: 1, name: 'Dogs' },
    tags: [{ id: 1, name: 'friendly' }, { id: 2, name: 'cute' }],
    status: PetStatus.AVAILABLE
  },
  {
    id: 2,
    name: 'Whiskers',
    photoUrls: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300'],
    category: { id: 2, name: 'Cats' },
    tags: [{ id: 3, name: 'playful' }],
    status: PetStatus.AVAILABLE
  },
  {
    id: 3,
    name: 'Max',
    photoUrls: ['https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300'],
    category: { id: 1, name: 'Dogs' },
    tags: [{ id: 4, name: 'energetic' }],
    status: PetStatus.PENDING
  }
];

let nextId = 4;

// Simulate API delay
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Mock Pet API Service
 * Implements the petstore OpenAPI endpoints
 */
class PetApiService {
  /**
   * GET /pet/{petId} - Find pet by ID
   */
  async getPetById(petId: number): Promise<Pet> {
    await delay();

    const pet = pets.find(p => p.id === petId);

    if (!pet) {
      throw new Error(`Pet with ID ${petId} not found`);
    }

    return pet;
  }

  /**
   * POST /pet - Add a new pet to the store
   */
  async addPet(pet: Omit<Pet, 'id'>): Promise<Pet> {
    await delay();

    // Validate required fields
    if (!pet.name || !pet.photoUrls || pet.photoUrls.length === 0) {
      throw new Error('Invalid input: name and photoUrls are required');
    }

    const newPet: Pet = {
      ...pet,
      id: nextId++,
      status: pet.status || PetStatus.AVAILABLE
    };

    pets.push(newPet);

    return newPet;
  }

  /**
   * PUT /pet - Update an existing pet
   */
  async updatePet(pet: Pet): Promise<Pet> {
    await delay();

    if (!pet.id) {
      throw new Error('Pet ID is required for update');
    }

    const index = pets.findIndex(p => p.id === pet.id);

    if (index === -1) {
      throw new Error(`Pet with ID ${pet.id} not found`);
    }

    pets[index] = pet;

    return pet;
  }

  /**
   * DELETE /pet/{petId} - Deletes a pet
   */
  async deletePet(petId: number): Promise<void> {
    await delay();

    const index = pets.findIndex(p => p.id === petId);

    if (index === -1) {
      throw new Error(`Pet with ID ${petId} not found`);
    }

    pets.splice(index, 1);
  }

  /**
   * GET /pet/findByStatus - Finds Pets by status
   */
  async findPetsByStatus(status: PetStatusType[]): Promise<Pet[]> {
    await delay();

    if (!status || status.length === 0) {
      throw new Error('Invalid status value');
    }

    return pets.filter(p => p.status && status.includes(p.status));
  }

  /**
   * GET /pet - Get all pets (not in OpenAPI, but useful for UI)
   */
  async getAllPets(): Promise<Pet[]> {
    await delay();
    return [...pets];
  }
}

// Export singleton instance
export const petApi = new PetApiService();

