import type { Pet } from '../types/pet';

const mockPets: Pet[] = [
  {
    id: 1,
    name: 'Buddy',
    photoUrls: ['https://example.com/buddy.jpg'],
  },
  {
    id: 2,
    name: 'Max',
    photoUrls: ['https://example.com/max.jpg'],
  },
];

export const mockPetService = {
  addPet: async (pet: Omit<Pet, 'id'>): Promise<Pet> => {
    const newPet = { ...pet, id: mockPets.length + 1 };
    mockPets.push(newPet);
    return newPet;
  },

  getPetById: async (petId: number): Promise<Pet | undefined> => {
    return mockPets.find(pet => pet.id === petId);
  },
};