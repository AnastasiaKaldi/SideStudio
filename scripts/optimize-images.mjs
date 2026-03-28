import sharp from 'sharp'
import { readdirSync, statSync, mkdirSync } from 'fs'
import { join, extname, basename } from 'path'

const PUBLIC = 'public'
const MAX_WIDTH = 1600
const QUALITY_JPG = 80
const QUALITY_WEBP = 80

function getImages(dir) {
  const files = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) {
      files.push(...getImages(full))
    } else if (/\.(jpg|jpeg|png)$/i.test(entry) && entry !== 'favicon.png') {
      files.push(full)
    }
  }
  return files
}

async function optimize() {
  const images = getImages(PUBLIC)
  console.log(`Found ${images.length} images to optimize\n`)

  for (const file of images) {
    const ext = extname(file).toLowerCase()
    const name = basename(file)
    const sizeBefore = statSync(file).size

    try {
      const img = sharp(file)
      const meta = await img.metadata()

      const pipeline = sharp(file)

      if (meta.width > MAX_WIDTH) {
        pipeline.resize(MAX_WIDTH, null, { withoutEnlargement: true })
      }

      if (ext === '.png') {
        await pipeline.png({ quality: QUALITY_JPG, effort: 10 }).toBuffer()
          .then(buf => sharp(buf).toFile(file))
      } else {
        await pipeline.jpeg({ quality: QUALITY_JPG, mozjpeg: true }).toFile(file + '.tmp')
        const { renameSync } = await import('fs')
        renameSync(file + '.tmp', file)
      }

      // also generate webp
      const webpPath = file.replace(/\.(jpg|jpeg|png)$/i, '.webp')
      const webpPipeline = sharp(file)
      if (meta.width > MAX_WIDTH) {
        webpPipeline.resize(MAX_WIDTH, null, { withoutEnlargement: true })
      }
      await webpPipeline.webp({ quality: QUALITY_WEBP }).toFile(webpPath)

      const sizeAfter = statSync(file).size
      const sizeWebp = statSync(webpPath).size
      const saved = ((1 - sizeAfter / sizeBefore) * 100).toFixed(0)
      console.log(`${name}: ${(sizeBefore/1024).toFixed(0)}K → ${(sizeAfter/1024).toFixed(0)}K (${saved}% saved) | WebP: ${(sizeWebp/1024).toFixed(0)}K`)
    } catch (err) {
      console.error(`Failed: ${name} — ${err.message}`)
    }
  }

  console.log('\nDone!')
}

optimize()
