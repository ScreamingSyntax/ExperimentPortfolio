import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const sourceDir = '/Users/aaryanjha/Desktop/My ghibili';
const outputDir = path.resolve('public/characters');

const characters = [
  { source: 'Smile_No_BG.png', name: 'smile' },
  { source: 'achievements.png', name: 'achievement' },
  { source: 'achivements_2.png', name: 'achievement-framed' },
  { source: 'awards.png', name: 'awards' },
  { source: 'bug.png', name: 'bug' },
  { source: 'coding.png', name: 'coding-scene' },
  { source: 'coding_no_bg.png', name: 'coding', hero: true },
  { source: 'coffee_sitting.png', name: 'coffee' },
  { source: 'hii_my_name.png', name: 'intro' },
  { source: 'idea?.png', name: 'idea' },
  { source: 'khaiii.png', name: 'shrug' },
  { source: 'left_showcase_no_bg.png', name: 'showcase' },
  { source: 'pointing_right.png', name: 'pointing' },
  { source: 'sleeping.png', name: 'sleeping' },
  { source: 'thanks.png', name: 'thanks' },
  { source: 'thinking.png', name: 'thinking' },
];

await mkdir(outputDir, { recursive: true });

for (const character of characters) {
  const widths = character.hero ? [480, 768, 1024] : [160, 240, 400];
  const input = path.join(sourceDir, character.source);

  for (const width of widths) {
    const output = path.join(outputDir, `character-${character.name}-${width}.webp`);

    await sharp(input)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: character.hero ? 82 : 80, alphaQuality: 90, effort: 6 })
      .toFile(output);
  }
}

console.log(`Generated ${characters.length} character sets in ${outputDir}`);
