# Image Dithering Scripts

This directory contains scripts for applying dithering effects to images using [@thi.ng/pixel-dither](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel-dither).

## Setup

The required dependencies are already installed:
- `@thi.ng/pixel-dither` - Dithering algorithms
- `@thi.ng/pixel` - Pixel buffer manipulation (peer dependency)
- `sharp` - Image processing (already available via @11ty/eleventy-img)

## Usage

### Basic Usage

Place your source images in `src/img/dither-source/` and run:

```bash
pnpm dither
```

This will process all images and output dithered versions to `src/img/dither-dist/`.

### What the Script Does

The `dither-images.js` script will:

1. **Read images** from `src/img/dither-source/`
2. **Convert to grayscale** (GRAY8 format)
3. **Apply multiple algorithms**:
   - Atkinson
   - Burkes
   - Diffusion 2D
   - Floyd-Steinberg
   - Jarvis-Judice-Ninke
   - Sierra 2-row
   - Stucki
   - Ordered dithering (Bayer matrices at different sizes)

4. **Output** separate files for each algorithm, e.g.:
   - `image-atkinson.png`
   - `image-floyd.png`
   - `image-bayer-8x3.png`

### Customization Options

You can modify the script to:

1. **Preserve color** instead of grayscale:
   ```javascript
   // Change this line:
   const buf = intBufferFromImage(img, GRAY8);
   
   // To this:
   import { ARGB8888 } from '@thi.ng/pixel';
   const buf = intBufferFromImage(img, ARGB8888);
   ```

2. **Adjust dithering parameters**:
   ```javascript
   ditherWith(kernel, buf.copy(), {
     threshold: 0.66,  // Default is 0.5
     bleed: 0.75,      // Error diffusion amount, default 1.0
     channels: [0,1,2] // Which channels to dither (R,G,B)
   });
   ```

3. **Add more algorithms**:
   ```javascript
   import { THRESHOLD, DIFFUSION_ROW } from '@thi.ng/pixel-dither';
   
   const ALGORITHMS = {
     // ... existing ones
     threshold: THRESHOLD,
     row: DIFFUSION_ROW,
   };
   ```

4. **Change output sizes** (for Bayer/ordered dithering):
   ```javascript
   const ORDERED_CONFIGS = [
     { size: 2, levels: 2, name: 'bayer-2x2' },
     { size: 4, levels: 4, name: 'bayer-4x4' },
     { size: 16, levels: 4, name: 'bayer-16x4' },
   ];
   ```

### Available Algorithms

**Error Diffusion Kernels:**
- `ATKINSON` - Classic Atkinson dithering (used in early Mac software)
- `BURKES` - Burkes error diffusion
- `DIFFUSION_2D` - 2D diffusion pattern
- `DIFFUSION_ROW` - 1D row-based diffusion
- `DIFFUSION_COLUMN` - 1D column-based diffusion
- `FLOYD_STEINBERG` - Most common, good balance
- `JARVIS_JUDICE_NINKE` - High quality, more distributed errors
- `SIERRA2` - Sierra 2-row filter
- `STUCKI` - Similar to Jarvis but slightly different weights
- `THRESHOLD` - Simple threshold (no error diffusion)

**Ordered Dithering:**
- `orderedDither(buffer, size, levels)` - Bayer matrix dithering
  - `size`: 1, 2, 4, 8, 16, 32, or 64
  - `levels`: number of intensity levels (2-8 typical)

### Custom Dithering Kernels

You can create your own dithering patterns:

```javascript
const CUSTOM_KERNEL = {
  ox: [1, 2, -1, 0, 1],     // X offsets
  oy: [0, 0, 1, 1, 1],      // Y offsets  
  weights: [7, 5, 3, 5, 1], // Error distribution weights
  shift: 4,                  // Bit shift (divide by 2^shift)
};

ditherWith(CUSTOM_KERNEL, buffer);
```

## Integration with Eleventy

If you want to automate dithering during the build process, you could:

1. Add it as a prebuild step:
   ```json
   "scripts": {
     "prebuild": "node scripts/dither-images.js",
     "build": "eleventy"
   }
   ```

2. Or create an Eleventy transform/plugin that applies dithering to specific images.

## Examples

Check out the [official examples](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-dither) for more inspiration.

## Troubleshooting

**Error: Cannot find module '@thi.ng/pixel'**
- Run: `pnpm add -D @thi.ng/pixel`

**Images are too large/taking too long**
- Consider resizing images before dithering
- Add Sharp resize call before conversion:
  ```javascript
  const resized = await sharp(sourceFile)
    .resize(800, 800, { fit: 'inside' })
    .toBuffer();
  ```

**Want different output format (JPG, WebP, etc.)**
- Change the Sharp output call:
  ```javascript
  await sharp(pngBuffer)
    .webp({ quality: 80 })
    .toFile(outputFile.replace('.png', '.webp'));
  ```
