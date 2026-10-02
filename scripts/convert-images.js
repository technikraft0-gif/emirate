import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const imgDir = path.resolve('src/assets/images');
const files = fs.readdirSync(imgDir).filter(f => f.endsWith('.jpg'));

console.log(`Found ${files.length} JPEG files in ${imgDir}`);

async function processImages() {
  for (const file of files) {
    const filePath = path.join(imgDir, file);
    const baseName = path.basename(file, '.jpg');
    const image = sharp(filePath);
    const meta = await image.metadata();
    console.log(`\nProcessing ${file}: ${meta.width}x${meta.height}, original size ${(fs.statSync(filePath).size / 1024).toFixed(1)} KB`);

    const widths = [640, 1200];
    if (meta.width > 1200) {
      widths.push(meta.width);
    } else if (!widths.includes(meta.width)) {
      widths.push(meta.width);
    }

    // Generate WebP and AVIF for each width
    for (const w of widths) {
      const resizeOptions = meta.width > w ? { width: w } : null;

      // WebP
      const webpName = `${baseName}-${w}w.webp`;
      const webpPath = path.join(imgDir, webpName);
      let sWebp = sharp(filePath);
      if (resizeOptions) sWebp = sWebp.resize(resizeOptions);
      await sWebp.webp({ quality: 82 }).toFile(webpPath);
      const webpSize = (fs.statSync(webpPath).size / 1024).toFixed(1);

      // AVIF
      const avifName = `${baseName}-${w}w.avif`;
      const avifPath = path.join(imgDir, avifName);
      let sAvif = sharp(filePath);
      if (resizeOptions) sAvif = sAvif.resize(resizeOptions);
      await sAvif.avif({ quality: 75 }).toFile(avifPath);
      const avifSize = (fs.statSync(avifPath).size / 1024).toFixed(1);

      console.log(`  -> ${webpName} (${webpSize} KB) | ${avifName} (${avifSize} KB)`);
    }

    // Also generate a canonical full-resolution WebP and AVIF without width suffix for direct fallback
    const canonicalWebp = path.join(imgDir, `${baseName}.webp`);
    await sharp(filePath).webp({ quality: 85 }).toFile(canonicalWebp);
    const canonicalAvif = path.join(imgDir, `${baseName}.avif`);
    await sharp(filePath).avif({ quality: 80 }).toFile(canonicalAvif);
  }
  console.log('\nAll images successfully converted to WebP and AVIF!');
}

processImages().catch(err => {
  console.error('Error processing images:', err);
  process.exit(1);
});
