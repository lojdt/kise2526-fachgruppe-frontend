import type { Pet, ApiResponse } from '../types';

const BASE_URL = 'http://petstore.swagger.io/v2';

export const api = {
  // Find pets by status
  findPetsByStatus: async (status: string): Promise<Pet[]> => {
    const response = await fetch(`${BASE_URL}/pet/findByStatus?status=${status}`);
    if (!response.ok) throw new Error('Failed to fetch pets');
    return response.json();
  },

  // Get pet by ID
  getPetById: async (petId: number): Promise<Pet> => {
    const response = await fetch(`${BASE_URL}/pet/${petId}`);
    if (!response.ok) throw new Error('Failed to fetch pet');
    return response.json();
  },

  // Add a new pet
  addPet: async (pet: Pet): Promise<Pet> => {
    const response = await fetch(`${BASE_URL}/pet`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pet),
    });
    if (!response.ok) throw new Error('Failed to add pet');
    return response.json();
  },

  // Update an existing pet
  updatePet: async (pet: Pet): Promise<Pet> => {
    const response = await fetch(`${BASE_URL}/pet`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pet),
    });
    if (!response.ok) throw new Error('Failed to update pet');
    return response.json();
  },

  // Delete a pet
  deletePet: async (petId: number): Promise<void> => {
    const response = await fetch(`${BASE_URL}/pet/${petId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete pet');
  },

  // Upload image for a pet
  uploadImage: async (petId: number, file: File, additionalMetadata?: string): Promise<ApiResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    if (additionalMetadata) formData.append('additionalMetadata', additionalMetadata);

    const response = await fetch(`${BASE_URL}/pet/${petId}/uploadImage`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to upload image');
    return response.json();
  },
};