import type { Pet } from '../types/pet';

/**
 * Mock Pet Store API Service
 * This service simulates the backend API defined in petstore.openAPI.yaml
 */
class PetService {
  private pets: Map<number, Pet> = new Map();
  private nextId: number = 1;

  constructor() {
    // Initialize with some sample pets
    this.pets.set(1, {
      id: 1,
      name: 'Buddy',
      photoUrls: ['https://images.unsplash.com/photo-1517849845537-4d257902454a'],
      status: 'available',
      category: { id: 1, name: 'dogs' },
      tags: [{ id: 1, name: 'friendly' }]
    });
    
    this.pets.set(2, {
      id: 2,
      name: 'Whiskers',
      photoUrls: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba'],
      status: 'available',
      category: { id: 2, name: 'cats' },
      tags: [{ id: 2, name: 'playful' }]
    });
    
    this.nextId = 3;
  }

  /**
   * Add a new pet to the store (POST /pet)
   * @param pet - Pet object to be added (without id)
   * @returns Promise with the created pet including assigned id
   */
  async addPet(pet: Omit<Pet, 'id'>): Promise<Pet> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));

    // Validate required fields
    if (!pet.name || !pet.photoUrls || pet.photoUrls.length === 0) {
      throw new Error('Invalid input: name and photoUrls are required');
    }

    const newPet: Pet = {
      ...pet,
      id: this.nextId++
    };

    this.pets.set(newPet.id!, newPet);
    return newPet;
  }

  /**
   * Find pet by ID (GET /pet/{petId})
   * @param petId - ID of pet to return
   * @returns Promise with the pet or throws error if not found
   */
  async getPetById(petId: number): Promise<Pet> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 200));

    if (!petId || petId < 1) {
      throw new Error('Invalid ID supplied');
    }

    const pet = this.pets.get(petId);
    if (!pet) {
      throw new Error('Pet not found');
    }

    return pet;
  }

  /**
   * Get all pets (for demonstration purposes)
   * @returns Promise with array of all pets
   */
  async getAllPets(): Promise<Pet[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return Array.from(this.pets.values());
  }
}

// Export a singleton instance
export const petService = new PetService();
