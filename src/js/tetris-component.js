// Tetris Web Components
// Usage:
//   <tetris-box></tetris-box>
//   <tetris-piece></tetris-piece>

// Shared tetris pieces data
const TETRIS_PIECES = [
  { name: "i", width: 1, height: 4, color: "#00f0f0" },
  { name: "o", width: 2, height: 2, color: "#f0f000" },
  { name: "t", width: 3, height: 2, color: "#a000f0" },
  { name: "s", width: 3, height: 2, color: "#00f000" },
  { name: "z", width: 3, height: 2, color: "#f00000" },
  { name: "j", width: 2, height: 3, color: "#0000f0" },
  { name: "l", width: 2, height: 3, color: "#f0a000" },
]

const BLOCK_SIZE = 25 // Each individual block is 25px

// Utility functions
function rectsOverlap(rect1, rect2, padding = 10) {
  return !(
    rect1.right + padding < rect2.left ||
    rect1.left - padding > rect2.right ||
    rect1.bottom + padding < rect2.top ||
    rect1.top - padding > rect2.bottom
  )
}

function findNonOverlappingPosition(
  piece,
  placedPieces,
  containerRect,
  rotationDeg = 0,
  maxAttempts = 50
) {
  // Helper to compute axis-aligned bounding box for a rectangle rotated around its center
  function getRotatedAABB(w, h, angleDeg) {
    const rad = (Math.abs(angleDeg) * Math.PI) / 180
    const cos = Math.cos(rad)
    const sin = Math.sin(rad)
    // Axis-aligned bounding box dimensions after rotation
    const aabbW = Math.abs(w * cos) + Math.abs(h * sin)
    const aabbH = Math.abs(w * sin) + Math.abs(h * cos)
    return { aabbW, aabbH }
  }

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    // Generate random position in percentage
    const xPercent = Math.random() * 85 // Leave some margin
    // Allow negative Y (above viewport) or positive Y
    const yPercent =
      Math.random() < 0.5
        ? Math.random() * 85 // Positive (visible)
        : -(Math.random() * 30) // Negative (partially above viewport)

    // Convert to pixels for collision detection
    const x = (containerRect.width * xPercent) / 100
    const y = (containerRect.height * yPercent) / 100
    const width = piece.width * BLOCK_SIZE
    const height = piece.height * BLOCK_SIZE

    // Compute rotated bounding box around the element's center
    const { aabbW, aabbH } = getRotatedAABB(width, height, rotationDeg)
    const cx = x + width / 2
    const cy = y + height / 2
    const left = cx - aabbW / 2
    const top = cy - aabbH / 2

    const candidateRect = {
      left,
      top,
      right: left + aabbW,
      bottom: top + aabbH,
    }

    // Check against all placed pieces
    const hasOverlap = placedPieces.some((placedRect) =>
      rectsOverlap(candidateRect, placedRect)
    )

    if (!hasOverlap) {
      return { x: xPercent, y: yPercent, rect: candidateRect }
    }
  }

  // If we can't find a spot after max attempts, return a random position anyway
  const xPercent = Math.random() * 85
  const yPercent =
    Math.random() < 0.5 ? Math.random() * 85 : -(Math.random() * 30)
  const x = (containerRect.width * xPercent) / 100
  const y = (containerRect.height * yPercent) / 100
  const width = piece.width * BLOCK_SIZE
  const height = piece.height * BLOCK_SIZE
  const { aabbW, aabbH } = (function () {
    const rad = (Math.abs(rotationDeg) * Math.PI) / 180
    const cos = Math.cos(rad)
    const sin = Math.sin(rad)
    return {
      aabbW: Math.abs(width * cos) + Math.abs(height * sin),
      aabbH: Math.abs(width * sin) + Math.abs(height * cos),
    }
  })()
  const cx = x + width / 2
  const cy = y + height / 2
  const left = cx - aabbW / 2
  const top = cy - aabbH / 2
  return {
    x: xPercent,
    y: yPercent,
    rect: {
      left,
      top,
      right: left + aabbW,
      bottom: top + aabbH,
    },
  }
}

function getRandomRotation() {
  const rotations = [0, 90, 180, 270]
  return rotations[Math.floor(Math.random() * rotations.length)]
}

function getRandomPiece() {
  return TETRIS_PIECES[Math.floor(Math.random() * TETRIS_PIECES.length)]
}

// TetrisBox Component - displays multiple tetris pieces with collision detection
class TetrisBox extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    // Wait a tick for layout to settle
    setTimeout(() => {
      this.render()
    }, 0)
  }

  // Allow re-rendering if needed
  refresh() {
    this.render()
  }

  render() {
    // Get configuration from attributes
    const statement = this.getAttribute("statement")
    const pieceCount = parseInt(this.getAttribute("piece-count") || "21", 10)
    const imgPath = this.getAttribute("img-path") || "/img"

    // Clear existing content
    this.innerHTML = ""

    // Add statement if provided
    if (statement) {
      const statementEl = document.createElement("h2")
      statementEl.className = "statement"
      statementEl.innerHTML = statement
      this.appendChild(statementEl)
    }

    // Track placed pieces for collision detection
    const placedPieces = []
    const containerRect = this.getBoundingClientRect()

    // Generate pieces array (repeat the base pieces to get desired count)
    const pieces = []
    while (pieces.length < pieceCount) {
      pieces.push(...TETRIS_PIECES)
    }
    const selectedPieces = pieces.slice(0, pieceCount)

    // Create each piece
    selectedPieces.forEach((piece) => {
      // Random rotation chosen BEFORE placement so collision uses rotated AABB
      const rotation = getRandomRotation()

      const img = document.createElement("img")
      img.src = `${imgPath}/tetris-${piece.name}.svg`
      img.alt = `Tetris ${piece.name} piece`
      img.className = "tetris-piece"

      img.dataset.rotation = rotation
      img.style.transform = `rotate(${rotation}deg)`
      img.style.position = "absolute"
      img.style.width = `${piece.width * BLOCK_SIZE}px`
      img.style.height = `${piece.height * BLOCK_SIZE}px`
      img.style.cursor = "pointer"

      // Find non-overlapping position
      const position = findNonOverlappingPosition(
        piece,
        placedPieces,
        containerRect,
        rotation
      )
      img.style.left = `${position.x}%`
      img.style.top = `${position.y}%`

      // Store this piece's position
      placedPieces.push(position.rect)

      // Rotate on click
      img.addEventListener("click", (e) => {
        e.stopPropagation()
        const currentRotation = parseInt(img.dataset.rotation) || 0
        const newRotation = currentRotation + 90
        img.dataset.rotation = newRotation
        img.style.transform = `rotate(${newRotation}deg)`
      })

      this.appendChild(img)
    })
  }
}

// TetrisPiece Component - displays a single random tetris piece
class TetrisPiece extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    setTimeout(() => {
      this.render()
    }, 0)
  }

  refresh() {
    this.render()
  }

  render() {
    const imgPath = this.getAttribute("img-path") || "/img"
    const pieceName = this.getAttribute("piece")
    const blockSize = parseInt(
      this.getAttribute("block-size") || String(BLOCK_SIZE),
      10
    )

    // Clear existing content
    this.innerHTML = ""

    // Select piece
    let piece
    if (pieceName) {
      piece = TETRIS_PIECES.find((p) => p.name === pieceName)
      if (!piece) {
        console.warn(`Tetris piece "${pieceName}" not found, using random`)
        piece = getRandomPiece()
      }
    } else {
      piece = getRandomPiece()
    }

    // Create image element
    const img = document.createElement("img")
    img.src = `${imgPath}/tetris-${piece.name}.svg`
    img.alt = `Tetris ${piece.name} piece`
    img.className = "tetris-piece-single"
    img.style.width = `${piece.width * blockSize}px`
    img.style.height = `${piece.height * blockSize}px`

    // Optional rotation attribute
    const rotation = this.getAttribute("rotation")
    if (rotation) {
      // Accept values like "90" or "90deg"
      const val = /deg$/i.test(rotation) ? rotation : `${rotation}deg`
      img.style.transform = `rotate(${val})`
    }

    this.appendChild(img)
  }
}

// Register the custom elements
customElements.define("tetris-box", TetrisBox)
customElements.define("tetris-piece", TetrisPiece)
