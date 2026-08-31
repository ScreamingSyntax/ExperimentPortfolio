import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const sourceDir = '/Users/aaryanjha/Documents/keywraithitchassets 2';
const characterSource = '/Users/aaryanjha/Desktop/My ghibili/game.png';
const outputDir = path.resolve('public/keywraith');

const assets = [
  {
    source: 'exec-63c3070f-507a-4cb7-abb5-b4f24fb33ed3.png',
    name: 'scene',
    widths: [640, 1024, 1600],
  },
  { source: 'transparent_logo.png', name: 'logo', widths: [360, 720] },
  { source: 'favicon.png', name: 'mark', widths: [64, 128] },
];

await mkdir(outputDir, { recursive: true });

for (const asset of assets) {
  for (const width of asset.widths) {
    await sharp(path.join(sourceDir, asset.source))
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82, alphaQuality: 90, effort: 6 })
      .toFile(path.join(outputDir, `keywraith-${asset.name}-${width}.webp`));
  }
}

for (const width of [280, 420]) {
  await sharp(characterSource)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82, alphaQuality: 90, effort: 6 })
    .toFile(path.join(outputDir, `keywraith-maker-${width}.webp`));
}

console.log(`Generated ${assets.length} Keywraith asset sets and the maker artwork in ${outputDir}`);
