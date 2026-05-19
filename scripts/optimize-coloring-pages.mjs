/**
 * Optimize coloring page images for Studio Magico.
 *
 * For each PNG/JPG/JFIF in colouring_pages/ (root):
 *  - Resize so the long side fits in 1754 px (= A4 @ ~150 DPI)
 *  - Save as palette PNG (small, lossless edges — good for flood fill)
 *  - Generate a small preview (max 240 px) in colouring_pages/thumbs/
 *  - Convert filename to .png and delete the original if extension changed
 *
 * Run once after adding new drawings:
 *   node scripts/optimize-coloring-pages.mjs
 */

import sharp from 'sharp';
import fs   from 'node:fs/promises';
import path from 'node:path';
import url  from 'node:url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const ROOT      = path.resolve(__dirname, '..', 'colouring_pages');
const THUMBS    = path.join(ROOT, 'thumbs');

const MAIN_MAX  = 1754; // A4 lato lungo a ~150 DPI
const THUMB_MAX = 240;  // anteprima per le card della galleria

const IMG_RE = /\.(png|jpe?g|jfif)$/i;

await fs.mkdir(THUMBS, { recursive: true });

const files = (await fs.readdir(ROOT)).filter(f => IMG_RE.test(f));
files.sort();

const stats = { count: 0, before: 0, after: 0, thumbs: 0 };

for (const file of files) {
  const inPath   = path.join(ROOT, file);
  const ext      = path.extname(file).toLowerCase();
  const base     = path.parse(file).name;
  const outMain  = path.join(ROOT,   base + '.png');
  const outThumb = path.join(THUMBS, base + '.png');

  const sizeBefore = (await fs.stat(inPath)).size;

  // legge in un buffer (così possiamo sovrascrivere outMain anche
  // quando coincide con inPath — sharp non legge e scrive sullo
  // stesso file in modo affidabile)
  const buf  = await fs.readFile(inPath);
  const meta = await sharp(buf).metadata();

  const mainBuf = await sharp(buf)
    .resize({
      width:  MAIN_MAX,
      height: MAIN_MAX,
      fit: 'inside',
      withoutEnlargement: true
    })
    .png({
      palette: true,        // quantizzazione palette → file piccoli
      quality: 85,
      compressionLevel: 9
    })
    .toBuffer();

  const thumbBuf = await sharp(buf)
    .resize({
      width:  THUMB_MAX,
      height: THUMB_MAX,
      fit: 'inside',
      withoutEnlargement: true
    })
    .png({
      palette: true,
      quality: 70,
      compressionLevel: 9
    })
    .toBuffer();

  await fs.writeFile(outMain,  mainBuf);
  await fs.writeFile(outThumb, thumbBuf);

  // se il file originale aveva un'estensione diversa, eliminalo
  if (ext !== '.png') {
    await fs.unlink(inPath);
  }

  const sizeAfter = mainBuf.length;
  stats.count   += 1;
  stats.before  += sizeBefore;
  stats.after   += sizeAfter;
  stats.thumbs  += thumbBuf.length;

  const w = meta.width, h = meta.height;
  console.log(
    `${file.padEnd(30)} ${String(w).padStart(4)}×${String(h).padEnd(4)} ` +
    `${(sizeBefore / 1024).toFixed(0).padStart(5)} KB → ` +
    `${(sizeAfter  / 1024).toFixed(0).padStart(4)} KB  ` +
    `(thumb ${(thumbBuf.length / 1024).toFixed(0)} KB)`
  );
}

console.log('');
console.log(`Processati ${stats.count} file`);
console.log(`Totale prima:  ${(stats.before / 1024 / 1024).toFixed(2)} MB`);
console.log(`Totale dopo:   ${(stats.after  / 1024 / 1024).toFixed(2)} MB`);
console.log(`Thumbnails:    ${(stats.thumbs / 1024 / 1024).toFixed(2)} MB`);
console.log(`Risparmio:     ${((1 - stats.after / stats.before) * 100).toFixed(0)}%`);
