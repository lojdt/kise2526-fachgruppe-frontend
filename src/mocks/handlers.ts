import { http, HttpResponse } from 'msw';
import { Pet } from '../api';

// In-memory "database"
const pets: Pet[] = [
  {
    id: 1,
    name: 'Buddy',
    photoUrls: ['https://example.com/buddy.jpg'],
    category: { name: 'Dog' },
    tags: [{ name: 'friendly' }],
    status: Pet.status.AVAILABLE,
  },
];
let nextPetId = 2;

export const handlers = [
  // Mock for "Create Pet" (POST /pet)
  http.post('http://localhost:5179/v2/pet', async ({ request }) => {
    const newPetData = await request.json() as Pet;

    if (!newPetData || typeof newPetData !== 'object') {
        return new HttpResponse(null, { status: 405, statusText: 'Invalid input' });
    }

    const newPet: Pet = {
      id: nextPetId++,
      ...newPetData,
    };

    pets.push(newPet);

    console.log('MSW: Created pet:', newPet);
    return HttpResponse.json(newPet);
  }),

  // Mock for "Search Pet" (GET /pet/{petId})
  http.get('http://localhost:5179/v2/pet/:petId', ({ params }) => {
    const { petId } = params;
    const pet = pets.find(p => p.id === Number(petId));

    if (pet) {
      console.log('MSW: Found pet:', pet);
      return HttpResponse.json(pet);
    } else {
      console.log(`MSW: Pet with ID ${petId} not found.`);
      return new HttpResponse(null, { status: 404, statusText: 'Pet not found' });
    }
  }),
];
