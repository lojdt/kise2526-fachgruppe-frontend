/**
 * Verification Tests for Pet API Mock Backend
 *
 * This file contains automated tests to verify that:
 * 1. Search Pet (getById) function works correctly
 * 2. Create Pet (POST) function works correctly
 */

import { petApi } from './services/petApi.service';
import { PetStatus } from './types/pet.types';

async function runVerificationTests() {
  console.log('🧪 Starting Pet API Verification Tests...\n');

  let testsPassed = 0;
  let testsFailed = 0;

  // Test 1: Search existing pet by ID
  try {
    console.log('Test 1: Search Pet by ID (getPetById)');
    console.log('Searching for pet with ID: 1');

    const pet = await petApi.getPetById(1);

    if (pet && pet.id === 1 && pet.name) {
      console.log('✅ PASSED: Found pet:', pet);
      testsPassed++;
    } else {
      console.log('❌ FAILED: Invalid pet data returned');
      testsFailed++;
    }
  } catch (error) {
    console.log('❌ FAILED: Error searching for pet:', error);
    testsFailed++;
  }

  console.log('\n---\n');

  // Test 2: Search non-existent pet
  try {
    console.log('Test 2: Search Non-existent Pet by ID');
    console.log('Searching for pet with ID: 999');

    await petApi.getPetById(999);

    console.log('❌ FAILED: Should have thrown an error for non-existent pet');
    testsFailed++;
  } catch (error) {
    if (error instanceof Error && error.message.includes('not found')) {
      console.log('✅ PASSED: Correctly returned error for non-existent pet');
      testsPassed++;
    } else {
      console.log('❌ FAILED: Wrong error type:', error);
      testsFailed++;
    }
  }

  console.log('\n---\n');

  // Test 3: Create new pet
  try {
    console.log('Test 3: Create New Pet (addPet)');

    const newPetData = {
      name: 'Test Dog',
      photoUrls: ['https://example.com/dog.jpg'],
      category: { id: 1, name: 'Dogs' },
      tags: [{ id: 1, name: 'test' }],
      status: PetStatus.AVAILABLE
    };

    console.log('Creating pet with data:', newPetData);

    const createdPet = await petApi.addPet(newPetData);

    if (createdPet && createdPet.id && createdPet.name === 'Test Dog') {
      console.log('✅ PASSED: Pet created successfully:', createdPet);
      testsPassed++;

      // Test 4: Verify created pet can be found
      console.log('\nTest 4: Verify Created Pet Can Be Found');
      const foundPet = await petApi.getPetById(createdPet.id!);

      if (foundPet && foundPet.id === createdPet.id) {
        console.log('✅ PASSED: Created pet found successfully');
        testsPassed++;
      } else {
        console.log('❌ FAILED: Could not find created pet');
        testsFailed++;
      }
    } else {
      console.log('❌ FAILED: Invalid pet created');
      testsFailed++;
    }
  } catch (error) {
    console.log('❌ FAILED: Error creating pet:', error);
    testsFailed++;
  }

  console.log('\n---\n');

  // Test 5: Create pet with invalid data
  try {
    console.log('Test 5: Create Pet with Invalid Data');

    const invalidPetData = {
      name: '',
      photoUrls: []
    };

    console.log('Attempting to create pet with invalid data');

    await petApi.addPet(invalidPetData);

    console.log('❌ FAILED: Should have thrown validation error');
    testsFailed++;
  } catch (error) {
    if (error instanceof Error && error.message.includes('Invalid input')) {
      console.log('✅ PASSED: Correctly rejected invalid pet data');
      testsPassed++;
    } else {
      console.log('❌ FAILED: Wrong error type:', error);
      testsFailed++;
    }
  }

  console.log('\n---\n');

  // Test 6: Get all pets
  try {
    console.log('Test 6: Get All Pets');

    const allPets = await petApi.getAllPets();

    if (allPets && Array.isArray(allPets) && allPets.length > 0) {
      console.log(`✅ PASSED: Retrieved ${allPets.length} pets`);
      testsPassed++;
    } else {
      console.log('❌ FAILED: Could not retrieve pets');
      testsFailed++;
    }
  } catch (error) {
    console.log('❌ FAILED: Error getting all pets:', error);
    testsFailed++;
  }

  // Summary
  console.log('\n=================================');
  console.log('📊 VERIFICATION TEST SUMMARY');
  console.log('=================================');
  console.log(`✅ Tests Passed: ${testsPassed}`);
  console.log(`❌ Tests Failed: ${testsFailed}`);
  console.log(`📈 Total Tests: ${testsPassed + testsFailed}`);
  console.log(`🎯 Success Rate: ${((testsPassed / (testsPassed + testsFailed)) * 100).toFixed(1)}%`);
  console.log('=================================\n');

  if (testsFailed === 0) {
    console.log('🎉 All verification tests passed!');
    console.log('✨ The "Search Pet" (getById) and "Create Pet" (POST) functions are working correctly.');
  } else {
    console.log('⚠️ Some tests failed. Please review the errors above.');
  }
}

// Run tests
runVerificationTests().catch(console.error);

