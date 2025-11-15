/**
 * Simplified image dithering script using Sharp directly
 *
 * This version uses Sharp (already installed) for both loading and saving,
 * making it simpler and avoiding the need for browser-based image loading.
 *
 * Usage:
 *   node scripts/dither-images-sharp.js
 */

import { readdir, mkdir } from "fs/promises"
import { join, basename, extname } from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"
import sharp from "sharp"
import { GRAY8, IntBuffer } from "@thi.ng/pixel"
import {
  ATKINSON,
  BURKES,
  DIFFUSION_2D,
  FLOYD_STEINBERG,
  JARVIS_JUDICE_NINKE,
  SIERRA2,
  STUCKI,
  ditherWith,
  orderedDither,
} from "@thi.ng/pixel-dither"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const SOURCE_DIR = join(__dirname, "..", "src", "img", "dither-source")
const OUTPUT_DIR = join(__dirname, "..", "src", "img", "dither-dist")

const ALGORITHMS = {
  atkinson: ATKINSON,
  burkes: BURKES,
  diffusion: DIFFUSION_2D,
  floyd: FLOYD_STEINBERG,
  jarvis: JARVIS_JUDICE_NINKE,
  sierra: SIERRA2,
  stucki: STUCKI,
}

const ORDERED_CONFIGS = [
  { size: 4, levels: 2, name: "bayer-4x2" },
  { size: 8, levels: 3, name: "bayer-8x3" },
]

/**
 * Load image directly with Sharp and convert to pixel buffer
 */
async function loadImageToBuffer(filePath) {
  // Load and convert to grayscale
  const { data, info } = await sharp(filePath)
    .grayscale()
    .raw()
    .toBuffer({ resolveWithObject: true })

  // Create IntBuffer from the raw data
  const buffer = new IntBuffer(
    info.width,
    info.height,
    GRAY8,
    new Uint8Array(data)
  )

  return buffer
}

/**
 * Save pixel buffer as PNG
 */
async function saveBuffer(buffer, outputPath) {
  const { width, height, data } = buffer

  await sharp(Buffer.from(data), {
    raw: {
      width,
      height,
      channels: 1, // GRAY8
    },
  })
    .png({ compressionLevel: 9 })
    .toFile(outputPath)
}

/**
 * Process a single image
 */
async function processImage(sourceFile) {
  const fileName = basename(sourceFile, extname(sourceFile))
  console.log(`\nProcessing: ${fileName}`)

  try {
    // Load image as pixel buffer
    const buf = await loadImageToBuffer(sourceFile)
    console.log(`  Loaded: ${buf.width}x${buf.height}`)

    // Apply error diffusion algorithms
    // for (const [name, kernel] of Object.entries(ALGORITHMS)) {
    // 	const outputFile = join(OUTPUT_DIR, `${fileName}-${name}.png`);
    // 	console.log(`  Applying ${name}...`);

    // 	const dithered = ditherWith(kernel, buf.copy());
    // 	await saveBuffer(dithered, outputFile);
    // 	console.log(`    ✓ ${basename(outputFile)}`);
    // }

    // Apply ordered dithering
    for (const config of ORDERED_CONFIGS) {
      const outputFile = join(OUTPUT_DIR, `${fileName}-${config.name}.png`)
      console.log(`  Applying ordered dither (${config.name})...`)

      const dithered = orderedDither(buf.copy(), config.size, config.levels)
      await saveBuffer(dithered, outputFile)
      console.log(`    ✓ ${basename(outputFile)}`)
    }

    console.log(`✓ Completed ${fileName}`)
  } catch (error) {
    console.error(`✗ Error processing ${fileName}:`, error.message)
    throw error
  }
}

async function main() {
  console.log("Image Dithering Script (Sharp version)")
  console.log("========================================\n")
  console.log(`Source: ${SOURCE_DIR}`)
  console.log(`Output: ${OUTPUT_DIR}\n`)

  // Ensure output directory exists
  await mkdir(OUTPUT_DIR, { recursive: true })
  console.log("✓ Output directory ready\n")

  // Get image files
  const files = await readdir(SOURCE_DIR)
  const imageFiles = files.filter((file) =>
    /\.(jpe?g|png|webp|tiff?)$/i.test(file)
  )

  if (imageFiles.length === 0) {
    console.log("No image files found in source directory.")
    return
  }

  console.log(`Found ${imageFiles.length} image(s):`)
  imageFiles.forEach((f) => console.log(`  - ${f}`))
  console.log("")

  // Process each image
  for (const file of imageFiles) {
    await processImage(join(SOURCE_DIR, file))
  }

  console.log("\n========================================")
  console.log("✓ All images processed!")
  console.log(`\nOutput files are in: ${OUTPUT_DIR}`)
}

main().catch((error) => {
  console.error("Fatal error:", error)
  process.exit(1)
})
