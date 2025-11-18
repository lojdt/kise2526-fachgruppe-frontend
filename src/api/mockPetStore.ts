// Mock backend for Pet Store API
import type { Pet, PetStatus } from './types';
import { PetStatus as PetStatusConst } from './types';

// In-memory storage for pets
const pets: Pet[] = [
  {
    id: 1,
    name: 'Buddy',
    photoUrls: ['https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400'],
    category: { id: 1, name: 'Dogs' },
    tags: [{ id: 1, name: 'friendly' }],
    status: PetStatusConst.Available
  },
  {
    id: 2,
    name: 'Whiskers',
    photoUrls: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400'],
    category: { id: 2, name: 'Cats' },
    tags: [{ id: 2, name: 'playful' }],
    status: PetStatusConst.Available
  },
  {
    id: 3,
    name: 'Max',
    photoUrls: ['https://images.unsplash.com/photo-1552053831-71594a27632d?w=400'],
    category: { id: 1, name: 'Dogs' },
    tags: [{ id: 3, name: 'energetic' }],
    status: PetStatusConst.Pending
  }
];

let nextId = 4;

// Simulate network delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const mockPetStoreAPI = {
  /**
   * Get pet by ID
   */
  async getPetById(petId: number): Promise<Pet> {
    await delay();

    const pet = pets.find(p => p.id === petId);

    if (!pet) {
      throw new Error(`Pet with ID ${petId} not found`);
    }

    return pet;
  },

  /**
   * Add a new pet to the store
   */
  async addPet(pet: Omit<Pet, 'id'>): Promise<Pet> {
    await delay();

    if (!pet.name || !pet.photoUrls || pet.photoUrls.length === 0) {
      throw new Error('Invalid input: name and photoUrls are required');
    }

    const newPet: Pet = {
      ...pet,
      id: nextId++,
      status: pet.status || PetStatusConst.Available
    };

    pets.push(newPet);

    return newPet;
  },

  /**
   * Update an existing pet
   */
  async updatePet(pet: Pet): Promise<Pet> {
    await delay();

    const index = pets.findIndex(p => p.id === pet.id);

    if (index === -1) {
      throw new Error(`Pet with ID ${pet.id} not found`);
    }

    pets[index] = pet;

    return pet;
  },

  /**
   * Find pets by status
   */
  async findPetsByStatus(status: PetStatus[]): Promise<Pet[]> {
    await delay();

    return pets.filter(pet => status.includes(pet.status || PetStatusConst.Available));
  },

  /**
   * Delete a pet
   */
  async deletePet(petId: number): Promise<void> {
    await delay();

    const index = pets.findIndex(p => p.id === petId);

    if (index === -1) {
      throw new Error(`Pet with ID ${petId} not found`);
    }

    pets.splice(index, 1);
  },

  /**
   * Get all pets (for testing)
   */
  async getAllPets(): Promise<Pet[]> {
    await delay();
    return [...pets];
  }
};


