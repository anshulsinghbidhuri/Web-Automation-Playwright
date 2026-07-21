#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const reportsDir = path.resolve(process.cwd(), 'reports');
const reportHtmlPath = path.join(reportsDir, 'index.html');

if (!fs.existsSync(reportHtmlPath)) {
  console.error('No report found. Run your feature tests first.');
  process.exit(1);
}

const isWindows = process.platform === 'win32';
const command = isWindows ? `start "" "${reportHtmlPath}"` : `xdg-open "${reportHtmlPath}"`;

try {
  execSync(command, { stdio: 'inherit', shell: true });
} catch (error) {
  console.log(`Report ready at: ${reportHtmlPath}`);
}
