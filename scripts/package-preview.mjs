import { mkdirSync, cpSync, writeFileSync } from 'node:fs';
mkdirSync('dist/server', { recursive: true });
cpSync('.output/server', 'dist/server', { recursive: true });
cpSync('.output/public', 'dist/client', { recursive: true });
writeFileSync('dist/server/index.js', "export { default } from './index.mjs';\n");
