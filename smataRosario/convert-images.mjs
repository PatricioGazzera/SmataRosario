import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';

const INPUT_DIR = './src/utils/images';
const QUALITY = 80;
const EXTENSIONS = ['.jpg', '.jpeg', '.png'];

async function getFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const fullPath = join(dir, entry.name);
      return entry.isDirectory() ? getFiles(fullPath) : fullPath;
    })
  );
  return files.flat();
}

async function convertToWebP(filePath) {
  const ext = extname(filePath).toLowerCase();
  if (!EXTENSIONS.includes(ext)) return;

  const outputPath = filePath.replace(ext, '.webp');
  const inputSize = (await stat(filePath)).size;

  try {
    await sharp(filePath)
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    const outputSize = (await stat(outputPath)).size;
    const saving = (((inputSize - outputSize) / inputSize) * 100).toFixed(1);
    const inputKB = (inputSize / 1024).toFixed(0);
    const outputKB = (outputSize / 1024).toFixed(0);

    console.log(`✅ ${basename(filePath)} → ${basename(outputPath)} | ${inputKB}KB → ${outputKB}KB (-${saving}%)`);
  } catch (err) {
    console.error(`❌ Error convirtiendo ${filePath}:`, err.message);
  }
}

async function main() {
  console.log(`\n🔄 Convirtiendo imágenes en ${INPUT_DIR}...\n`);
  const files = await getFiles(INPUT_DIR);
  await Promise.all(files.map(convertToWebP));
  console.log('\n✨ Listo! Ahora actualizá los imports en tu código cambiando .jpg/.jpeg/.png por .webp\n');
}

main();
