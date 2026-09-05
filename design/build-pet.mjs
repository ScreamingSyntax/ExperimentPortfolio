import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const source =
  '/Users/aaryanjha/Documents/Codex/2026-09-05/hatch-pet-users-aaryanjha-codex-skills/outputs/aaryan-pet/spritesheet.webp';
const outputDir = path.resolve('public/pet');
const output = path.join(outputDir, 'aaryan-spritesheet.webp');

await mkdir(outputDir, { recursive: true });

await sharp(source)
  .webp({ quality: 78, alphaQuality: 92, effort: 6, smartSubsample: true })
  .toFile(output);

const metadata = await sharp(output).metadata();

if (metadata.width !== 1536 || metadata.height !== 2288 || !metadata.hasAlpha) {
  throw new Error('The generated website pet atlas does not match the validated v2 geometry.');
}

console.log(`Generated ${output} (${metadata.width}x${metadata.height}, alpha: ${metadata.hasAlpha})`);
