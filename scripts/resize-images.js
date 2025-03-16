import fs from 'fs-extra'
import path from 'path'
import sharp from 'sharp'

const inputDir = 'public/originals' // Input folder
const outputDir = 'output' // Output folder

// Ensure output directory exists
fs.ensureDirSync(outputDir)

// Define image sizes
const sizes = [
  { width: 3840, name: '3840' },
  { width: 1920, name: '1920' },
  { width: 1280, name: '1280' },
  { width: 800, name: '800' },
]

// Process all images in input folder
async function processAllImages() {
  const files = await fs.readdir(inputDir) // Use async/await for ESM compatibility

  for (const file of files) {
    if (!file.endsWith('.jpg')) continue // Only process JPGs
    const inputPath = path.join(inputDir, file)
    console.log(`🚀 Processing: ${file}`)

    for (const size of sizes) {
      const outputBase = path.join(
        outputDir,
        `${path.parse(file).name}-${size.name}`
      )

      // Resize and save as JPG
      await sharp(inputPath).resize(size.width).toFile(`${outputBase}.jpg`)
      console.log(`✅ Created: ${outputBase}.jpg`)

      // Convert to WebP
      await sharp(inputPath)
        .resize(size.width)
        .toFormat('webp', { quality: 90 })
        .toFile(`${outputBase}.webp`)
      console.log(`✅ Created: ${outputBase}.webp`)

      // Convert to AVIF
      await sharp(inputPath)
        .resize(size.width)
        .toFormat('avif', { quality: 80 })
        .toFile(`${outputBase}.avif`)
      console.log(`✅ Created: ${outputBase}.avif`)
    }
  }

  console.log('🎉 All images processed successfully!')
}

// Run the script
processAllImages()
