import { http, HttpResponse } from 'msw';
import type { Pet } from '../types';

const BASE_URL = 'http://petstore.swagger.io/v2';

// Mock data
let pets: Pet[] = [
  {
    id: 1,
    name: 'Buddy',
    category: { id: 1, name: 'Dog' },
    photoUrls: ['https://example.com/buddy.jpg'],
    tags: [{ id: 1, name: 'friendly' }],
    status: 'available',
  },
  {
    id: 2,
    name: 'Whiskers',
    category: { id: 2, name: 'Cat' },
    photoUrls: ['https://example.com/whiskers.jpg'],
    tags: [{ id: 2, name: 'playful' }],
    status: 'pending',
  },
];

export const handlers = [
  // Find pets by status
  http.get(`${BASE_URL}/pet/findByStatus`, ({ request }) => {
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    const filteredPets = pets.filter(pet => pet.status === status);
    return HttpResponse.json(filteredPets);
  }),

  // Get pet by ID
  http.get(`${BASE_URL}/pet/:petId`, ({ params }) => {
    const petId = Number(params.petId);
    const pet = pets.find(p => p.id === petId);
    if (!pet) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(pet);
  }),

  // Add a new pet
  http.post(`${BASE_URL}/pet`, async ({ request }) => {
    const newPet = await request.json() as Pet;
    const id = Math.max(...pets.map(p => p.id || 0)) + 1;
    const petWithId = { ...newPet, id };
    pets.push(petWithId);
    return HttpResponse.json(petWithId, { status: 200 });
  }),

  // Update pet
  http.put(`${BASE_URL}/pet`, async ({ request }) => {
    const updatedPet = await request.json() as Pet;
    const index = pets.findIndex(p => p.id === updatedPet.id);
    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }
    pets[index] = updatedPet;
    return HttpResponse.json(updatedPet);
  }),

  // Delete pet
  http.delete(`${BASE_URL}/pet/:petId`, ({ params }) => {
    const petId = Number(params.petId);
    const index = pets.findIndex(p => p.id === petId);
    if (index === -1) {
      return new HttpResponse(null, { status: 400 });
    }
    pets.splice(index, 1);
    return new HttpResponse(null, { status: 200 });
  }),

  // Upload image
  http.post(`${BASE_URL}/pet/:petId/uploadImage`, () => {
    return HttpResponse.json({
      code: 200,
      type: 'success',
      message: 'Image uploaded successfully',
    });
  }),
];