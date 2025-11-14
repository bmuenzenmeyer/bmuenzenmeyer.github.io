/**
 * Image dithering script using @thi.ng/pixel-dither
 * 
 * This script processes images from src/img/dither-source/ and outputs
 * dithered versions to src/img/dither-dist/
 * 
 * Usage:
 *   node scripts/dither-images.js
 * 
 * Or add to package.json scripts:
 *   "dither": "node scripts/dither-images.js"
 */

import { readdir, mkdir } from 'node:fs/promises';
import { join, basename, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { GRAY8, imageFromURL, intBufferFromImage } from '@thi.ng/pixel';
import {
	ATKINSON,
	BURKES,
	DIFFUSION_2D,
	FLOYD_STEINBERG,
	JARVIS_JUDICE_NINKE,
	SIERRA2,
	STUCKI,
	ditherWith,
	orderedDither
} from '@thi.ng/pixel-dither';
import sharp from 'sharp';

// Get script directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const SOURCE_DIR = join(__dirname, '..', 'src', 'img', 'dither-source');
const OUTPUT_DIR = join(__dirname, '..', 'src', 'img', 'dither-dist');

// Dithering algorithms to apply
const ALGORITHMS = {
	atkinson: ATKINSON,
	burkes: BURKES,
	diffusion: DIFFUSION_2D,
	floyd: FLOYD_STEINBERG,
	jarvis: JARVIS_JUDICE_NINKE,
	sierra: SIERRA2,
	stucki: STUCKI,
};

// Ordered dithering configurations
const ORDERED_CONFIGS = [
	{ size: 4, levels: 2, name: 'bayer-4x2' },
	{ size: 8, levels: 3, name: 'bayer-8x3' },
];

/**
 * Load an image from the filesystem
 */
async function loadImage(filePath) {
	// Use file:// protocol for local files
	const fileUrl = `file://${filePath}`;
	return await imageFromURL(fileUrl);
}

/**
 * Convert a pixel buffer to a PNG buffer
 */
async function pixelBufferToPng(pixelBuffer) {
	const { width, height, data } = pixelBuffer;
	
	// Create a Sharp instance from the raw pixel data
	// The data format depends on the pixel buffer format
	// For GRAY8, it's single channel grayscale
	return await sharp(Buffer.from(data), {
		raw: {
			width,
			height,
			channels: 1, // GRAY8 is single channel
		}
	})
	.png()
	.toBuffer();
}

/**
 * Process a single image with all dithering algorithms
 */
async function processImage(sourceFile) {
	const fileName = basename(sourceFile, extname(sourceFile));
	console.log(`\nProcessing: ${fileName}`);
	
	try {
		// Load image
		const img = await loadImage(sourceFile);
		console.log(`  Loaded: ${img.width}x${img.height}`);
		
		// Convert to integer buffer in grayscale
		// You can also use ARGB8888 or RGB565 if you want to preserve color
		const buf = intBufferFromImage(img, GRAY8);
		console.log(`  Converted to GRAY8 buffer`);
		
		// Apply error diffusion algorithms
		for (const [name, kernel] of Object.entries(ALGORITHMS)) {
			const outputFile = join(OUTPUT_DIR, `${fileName}-${name}.png`);
			console.log(`  Applying ${name}...`);
			
			// Make a copy of the buffer for this algorithm
			const dithered = ditherWith(kernel, buf.copy());
			
			// Convert to PNG and save
			const pngBuffer = await pixelBufferToPng(dithered);
			await sharp(pngBuffer).toFile(outputFile);
			console.log(`    → ${outputFile}`);
		}
		
		// Apply ordered dithering (Bayer matrix)
		for (const config of ORDERED_CONFIGS) {
			const outputFile = join(OUTPUT_DIR, `${fileName}-${config.name}.png`);
			console.log(`  Applying ordered dither (${config.name})...`);
			
			const dithered = orderedDither(buf.copy(), config.size, config.levels);
			
			const pngBuffer = await pixelBufferToPng(dithered);
			await sharp(pngBuffer).toFile(outputFile);
			console.log(`    → ${outputFile}`);
		}
		
		console.log(`✓ Completed ${fileName}`);
	} catch (error) {
		console.error(`✗ Error processing ${fileName}:`, error.message);
	}
}

/**
 * Main execution
 */
async function main() {
	console.log('Image Dithering Script');
	console.log('======================\n');
	console.log(`Source: ${SOURCE_DIR}`);
	console.log(`Output: ${OUTPUT_DIR}\n`);
	
	// Ensure output directory exists
	try {
		await mkdir(OUTPUT_DIR, { recursive: true });
		console.log('✓ Output directory ready\n');
	} catch (error) {
		console.error('Error creating output directory:', error);
		process.exit(1);
	}
	
	// Get all image files from source directory
	let files;
	try {
		files = await readdir(SOURCE_DIR);
	} catch (error) {
		console.error('Error reading source directory:', error);
		process.exit(1);
	}
	
	// Filter for image files (jpg, jpeg, png)
	const imageFiles = files.filter(file => 
		/\.(jpe?g|png)$/i.test(file)
	);
	
	if (imageFiles.length === 0) {
		console.log('No image files found in source directory.');
		process.exit(0);
	}
	
	console.log(`Found ${imageFiles.length} image(s) to process:`);
	imageFiles.forEach(f => console.log(`  - ${f}`));
	console.log('');
	
	// Process each image
	for (const file of imageFiles) {
		await processImage(join(SOURCE_DIR, file));
	}
	
	console.log('\n======================');
	console.log('✓ All images processed!');
}

// Run the script
main().catch(error => {
	console.error('Fatal error:', error);
	process.exit(1);
});
