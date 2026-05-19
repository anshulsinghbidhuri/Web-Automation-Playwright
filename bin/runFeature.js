#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const name = process.argv[2];
if (!name) {
  console.error('Usage: npm run feature -- <FeatureName>');
  process.exit(1);
}

const featurePath = path.join(process.cwd(), 'tests', 'Feature', `${name}.feature`);
if (!fs.existsSync(featurePath)) {
  console.error(`Feature file not found: ${featurePath}`);
  process.exit(1);
}

const command = `npx cucumber-js "${featurePath}" --import tests/Support --import tests/StepDefintions`;
try {
  execSync(command, { stdio: 'inherit', shell: true });
  process.exit(0);
} catch (error) {
  process.exit(error.status || 1);
}
