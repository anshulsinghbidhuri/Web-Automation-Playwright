#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const name = process.argv[2];
if (!name) {
  console.error('Usage: npm run feature -- <FeatureName> OR npm run feature -- @tagName');
  process.exit(1);
}

let command;
if (name.startsWith('@')) {
  command = `npx cucumber-js "tests/Feature" --tags "${name}" --import tests/Support --import tests/StepDefintions`;
} else {
  const featurePath = path.join(process.cwd(), 'tests', 'Feature', `${name}.feature`);
  if (fs.existsSync(featurePath)) {
    command = `npx cucumber-js "${featurePath}" --import tests/Support --import tests/StepDefintions`;
  } else {
    command = `npx cucumber-js "tests/Feature" --tags "@${name}" --import tests/Support --import tests/StepDefintions`;
  }
}

try {
  execSync(command, { stdio: 'inherit', shell: true });
  process.exit(0);
} catch (error) {
  process.exit(error.status || 1);
}
