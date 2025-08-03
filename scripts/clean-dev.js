#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧹 Cleaning development environment...');

// Clean .next directory
const nextDir = path.join(process.cwd(), '.next');
if (fs.existsSync(nextDir)) {
  console.log('🗑️  Removing .next directory...');
  fs.rmSync(nextDir, { recursive: true, force: true });
}

// Clean TypeScript build info
const tsBuildInfo = path.join(process.cwd(), 'tsconfig.tsbuildinfo');
if (fs.existsSync(tsBuildInfo)) {
  console.log('🗑️  Removing TypeScript build info...');
  fs.unlinkSync(tsBuildInfo);
}

// Clean node_modules/.cache if it exists
const cacheDir = path.join(process.cwd(), 'node_modules', '.cache');
if (fs.existsSync(cacheDir)) {
  console.log('🗑️  Removing node_modules cache...');
  fs.rmSync(cacheDir, { recursive: true, force: true });
}

console.log('✅ Environment cleaned successfully!');
console.log('🚀 Starting development server...');

// Start development server
try {
  execSync('npm run dev', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Failed to start development server:', error.message);
  process.exit(1);
}