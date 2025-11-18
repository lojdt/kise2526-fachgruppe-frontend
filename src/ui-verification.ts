/**
 * UI Component Verification Script
 * This script verifies that all UI components are properly implemented
 */

import * as fs from 'fs';
import * as path from 'path';

interface VerificationResult {
  component: string;
  status: 'PASS' | 'FAIL';
  details: string[];
  errors: string[];
}

const results: VerificationResult[] = [];

function checkFileExists(filePath: string): boolean {
  return fs.existsSync(filePath);
}

function checkFileContains(filePath: string, patterns: string[]): { found: string[], missing: string[] } {
  if (!fs.existsSync(filePath)) {
    return { found: [], missing: patterns };
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const found: string[] = [];
  const missing: string[] = [];

  patterns.forEach(pattern => {
    if (content.includes(pattern)) {
      found.push(pattern);
    } else {
      missing.push(pattern);
    }
  });

  return { found, missing };
}

function verifyComponent(name: string, filePath: string, requiredPatterns: string[]): void {
  console.log(`\n🔍 Verifying: ${name}`);
  console.log(`   File: ${filePath}`);

  const result: VerificationResult = {
    component: name,
    status: 'PASS',
    details: [],
    errors: []
  };

  // Check if file exists
  if (!checkFileExists(filePath)) {
    result.status = 'FAIL';
    result.errors.push(`File not found: ${filePath}`);
    console.log(`   ❌ File not found!`);
    results.push(result);
    return;
  }

  result.details.push('✓ File exists');
  console.log(`   ✓ File exists`);

  // Check for required patterns
  const { found, missing } = checkFileContains(filePath, requiredPatterns);

  found.forEach(pattern => {
    result.details.push(`✓ Contains: ${pattern.substring(0, 50)}...`);
    console.log(`   ✓ Contains: ${pattern.substring(0, 50)}...`);
  });

  if (missing.length > 0) {
    result.status = 'FAIL';
    missing.forEach(pattern => {
      result.errors.push(`Missing: ${pattern.substring(0, 50)}...`);
      console.log(`   ❌ Missing: ${pattern.substring(0, 50)}...`);
    });
  }

  results.push(result);
}

console.log('═══════════════════════════════════════════════════');
console.log('🎯 Pet Store UI Component Verification');
console.log('═══════════════════════════════════════════════════');

// Verify App.tsx
verifyComponent(
  'App Component',
  'src/App.tsx',
  [
    'Pet Store Management',
    'Search Pet',
    'Create Pet',
    'activeTab',
    'SearchPet',
    'CreatePet'
  ]
);

// Verify SearchPet Component
verifyComponent(
  'SearchPet Component',
  'src/components/SearchPet.tsx',
  [
    'Search Pet by ID',
    'petApi.getPetById',
    'Pet Details',
    'pet-photo',
    'status-',
    'detail-label',
    'tags-container'
  ]
);

// Verify CreatePet Component
verifyComponent(
  'CreatePet Component',
  'src/components/CreatePet.tsx',
  [
    'Create New Pet',
    'Pet Name',
    'Photo URLs',
    'petApi.addPet',
    'Pet name is required',
    'photo URL is required',
    'successfully created'
  ]
);

// Verify SearchPet CSS
verifyComponent(
  'SearchPet Styles',
  'src/components/SearchPet.css',
  [
    '.search-pet-container',
    '.search-button',
    '.pet-details',
    '.pet-photo',
    '.status-available',
    '.status-pending'
  ]
);

// Verify CreatePet CSS
verifyComponent(
  'CreatePet Styles',
  'src/components/CreatePet.css',
  [
    '.create-pet-container',
    '.create-pet-form',
    '.form-group',
    '.submit-button',
    '.error-message',
    '.success-message'
  ]
);

// Verify App CSS
verifyComponent(
  'App Styles',
  'src/App.css',
  [
    '.app-header',
    '.tab-navigation',
    '.tab-button',
    '.app-content',
    'gradient'
  ]
);

// Verify Types
verifyComponent(
  'Pet Types',
  'src/types/pet.types.ts',
  [
    'interface Pet',
    'interface Category',
    'interface Tag',
    'PetStatus'
  ]
);

// Verify API Service
verifyComponent(
  'Pet API Service',
  'src/services/petApi.service.ts',
  [
    'getPetById',
    'addPet',
    'updatePet',
    'deletePet',
    'findPetsByStatus'
  ]
);

console.log('\n═══════════════════════════════════════════════════');
console.log('📊 VERIFICATION SUMMARY');
console.log('═══════════════════════════════════════════════════\n');

const passed = results.filter(r => r.status === 'PASS').length;
const failed = results.filter(r => r.status === 'FAIL').length;
const total = results.length;

console.log(`✅ Passed: ${passed}/${total}`);
console.log(`❌ Failed: ${failed}/${total}`);
console.log(`📈 Success Rate: ${((passed / total) * 100).toFixed(1)}%\n`);

// Detailed results
results.forEach(result => {
  const icon = result.status === 'PASS' ? '✅' : '❌';
  console.log(`${icon} ${result.component}: ${result.status}`);

  if (result.errors.length > 0) {
    result.errors.forEach(error => {
      console.log(`   ⚠️  ${error}`);
    });
  }
});

console.log('\n═══════════════════════════════════════════════════');

if (failed === 0) {
  console.log('🎉 ALL UI COMPONENTS VERIFIED SUCCESSFULLY!');
  console.log('✨ The UI is ready for manual testing.');
  console.log('\n📋 Next Steps:');
  console.log('   1. Start dev server: npm run dev');
  console.log('   2. Open: http://localhost:5173');
  console.log('   3. Test Search Pet functionality');
  console.log('   4. Test Create Pet functionality');
  console.log('   5. Verify responsive design');
} else {
  console.log('⚠️  Some components have issues. Please review above.');
  process.exit(1);
}

console.log('═══════════════════════════════════════════════════\n');

// Export results as JSON
const reportPath = 'ui-verification-report.json';
fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
console.log(`📄 Detailed report saved to: ${reportPath}\n`);

