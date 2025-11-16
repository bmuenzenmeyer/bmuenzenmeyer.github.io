# Tetris Web Components Migration Guide

## Overview

The tetris functionality has been converted into reusable Web Components. This provides better encapsulation, reusability, and eliminates the need for global IDs.

## Components

### `<tetris-box>`

Full tetris display with multiple pieces and collision detection. Replaces the `#tetris` element pattern.

### `<tetris-piece>`

Single tetris piece. Perfect for footers and decorative elements. Replaces the `#tetris-footer` pattern.

## Migration Steps

### 1. Update Script Import

**Before:**

```html
<script src="/js/tetris.js"></script>
```

**After:**

```html
<script src="/js/tetris-component.js"></script>
```

### 2. Replace Main Tetris Display

**Before (default.njk):**

```html
<div id="tetris"></div>
```

**After:**

```html
<tetris-box
  statement="I'm a multifaceted individual contributor and community leader.<br/><br/><em>I don't fit in a box anymore.</em>"
  piece-count="21"
  img-path="/img"
>
</tetris-box>
```

### 3. Replace Footer Piece

**Before (default.njk, item.njk):**

```html
<div id="tetris-footer"></div>
```

**After:**

```html
<tetris-piece img-path="/img"></tetris-piece>
```

## Benefits

### ✅ No More ID Dependencies

- No need for `getElementById()`
- Can use multiple instances on same page
- No conflicts between components

### ✅ Self-Contained

- Components initialize themselves automatically
- No timing/race conditions
- Works with dynamic content (SPAs, HTMX, etc.)

### ✅ Configurable via Attributes

- Easy to customize per-instance
- No JavaScript configuration needed
- HTML-first approach

### ✅ Better Encapsulation

- Each component manages its own state
- No global functions polluting namespace
- Easier to debug and maintain

## Advanced Usage

### Custom Configuration

```html
<!-- Fewer pieces -->
<tetris-box piece-count="10"></tetris-box>

<!-- Custom image path -->
<tetris-box img-path="/assets/images"></tetris-box>

<!-- Specific piece with rotation -->
<tetris-piece piece="i" rotation="45deg"></tetris-piece>

<!-- Custom block size -->
<tetris-piece block-size="30"></tetris-piece>
```

### Programmatic Control

```javascript
// Refresh/regenerate pieces
const tetrisBox = document.querySelector("tetris-box")
tetrisBox.refresh()

// Create dynamically
const piece = document.createElement("tetris-piece")
piece.setAttribute("piece", "t")
piece.setAttribute("rotation", "90deg")
document.body.appendChild(piece)
```

### Styling

```css
/* Style the container */
tetris-box {
  display: block;
  min-height: 500px;
  background: linear-gradient(to bottom, #fff, #f5f5f5);
}

/* Style the statement */
tetris-box .statement {
  font-size: 2rem;
  color: #333;
}

/* Style individual pieces */
tetris-box .tetris-piece {
  transition: transform 0.3s ease;
}

tetris-box .tetris-piece:hover {
  filter: brightness(1.2);
}

/* Style single pieces */
tetris-piece {
  display: inline-block;
  margin: 0.5rem;
}
```

## Comparison

| Feature             | Old (tetris.js)                 | New (Web Components) |
| ------------------- | ------------------------------- | -------------------- |
| ID dependency       | ✗ Yes (#tetris, #tetris-footer) | ✓ No IDs needed      |
| Multiple instances  | ✗ Only one per page             | ✓ Unlimited          |
| Auto-initialization | ✗ Timing issues                 | ✓ Always works       |
| Configuration       | ✗ Edit JavaScript               | ✓ HTML attributes    |
| Reusability         | ✗ Limited                       | ✓ High               |
| Maintenance         | ✗ Global scope                  | ✓ Encapsulated       |

## Backwards Compatibility

To maintain backwards compatibility temporarily, you can:

1. Keep both scripts loaded
2. The new components won't interfere with old code
3. Migrate page-by-page
4. Remove old script once all pages migrated

## Browser Support

Web Components are supported in all modern browsers:

- Chrome/Edge 54+
- Firefox 63+
- Safari 10.1+

For older browsers, consider using a polyfill or keep the old implementation.
