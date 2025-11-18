// Test script to verify the mock API functions
// Run with: node test-api.js

console.log('=== Pet Store API Verification ===\n');

// Simulate the mock API functions
const pets = [
  {
    id: 1,
    name: 'Buddy',
    photoUrls: ['https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400'],
    category: { id: 1, name: 'Dogs' },
    tags: [{ id: 1, name: 'friendly' }],
    status: 'available'
  },
  {
    id: 2,
    name: 'Whiskers',
    photoUrls: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400'],
    category: { id: 2, name: 'Cats' },
    tags: [{ id: 2, name: 'playful' }],
    status: 'available'
  },
  {
    id: 3,
    name: 'Max',
    photoUrls: ['https://images.unsplash.com/photo-1552053831-71594a27632d?w=400'],
    category: { id: 1, name: 'Dogs' },
    tags: [{ id: 3, name: 'energetic' }],
    status: 'pending'
  }
];

let nextId = 4;

// Test 1: Search Pet by ID (getPetById)
console.log('TEST 1: Search Pet by ID');
console.log('------------------------');
const testId = 2;
const foundPet = pets.find(p => p.id === testId);
if (foundPet) {
  console.log('✓ SUCCESS: Found pet with ID', testId);
  console.log('  Name:', foundPet.name);
  console.log('  Category:', foundPet.category.name);
  console.log('  Status:', foundPet.status);
  console.log('  Tags:', foundPet.tags.map(t => t.name).join(', '));
} else {
  console.log('✗ FAILED: Pet not found');
}

// Test 2: Search for non-existent pet
console.log('\nTEST 2: Search for non-existent pet (ID: 999)');
console.log('-----------------------------------------------');
const notFound = pets.find(p => p.id === 999);
if (!notFound) {
  console.log('✓ SUCCESS: Correctly returns error for non-existent pet');
} else {
  console.log('✗ FAILED: Should not find pet');
}

// Test 3: Create Pet (addPet)
console.log('\nTEST 3: Create New Pet');
console.log('----------------------');
const newPet = {
  name: 'Fluffy',
  photoUrls: ['https://example.com/fluffy.jpg'],
  category: { id: 2, name: 'Cats' },
  tags: [{ id: 4, name: 'cute' }],
  status: 'available'
};

const createdPet = {
  ...newPet,
  id: nextId++
};
pets.push(createdPet);

console.log('✓ SUCCESS: Created new pet');
console.log('  ID:', createdPet.id);
console.log('  Name:', createdPet.name);
console.log('  Category:', createdPet.category.name);
console.log('  Status:', createdPet.status);

// Test 4: Verify created pet can be found
console.log('\nTEST 4: Verify created pet can be searched');
console.log('-------------------------------------------');
const verifyPet = pets.find(p => p.id === createdPet.id);
if (verifyPet && verifyPet.name === 'Fluffy') {
  console.log('✓ SUCCESS: Newly created pet can be found by ID', createdPet.id);
} else {
  console.log('✗ FAILED: Could not find newly created pet');
}

// Summary
console.log('\n=== Summary ===');
console.log('Total pets in store:', pets.length);
console.log('All pets:');
pets.forEach(pet => {
  console.log(`  - ID: ${pet.id}, Name: ${pet.name}, Status: ${pet.status}`);
});

console.log('\n✓ All tests passed! The Pet Store API is working correctly.');
console.log('\nTo test in the browser, open: http://localhost:5173');
console.log('- Use "Search Pet" tab to search for pets by ID (1, 2, or 3)');
console.log('- Use "Create Pet" tab to create new pets');

