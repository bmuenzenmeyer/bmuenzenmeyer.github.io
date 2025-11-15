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
  maxAttempts = 50
) {
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

    const candidateRect = {
      left: x,
      top: y,
      right: x + width,
      bottom: y + height,
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
  return {
    x: xPercent,
    y: yPercent,
    rect: {
      left: x,
      top: y,
      right: x + piece.width * BLOCK_SIZE,
      bottom: y + piece.height * BLOCK_SIZE,
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
      const img = document.createElement("img")
      img.src = `${imgPath}/tetris-${piece.name}.svg`
      img.alt = `Tetris ${piece.name} piece`
      img.className = "tetris-piece"

      // Random rotation
      const rotation = getRandomRotation()
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
        containerRect
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
      img.style.transform = `rotate(${rotation}deg)`
    }

    this.appendChild(img)
  }
}

// Register the custom elements
customElements.define("tetris-box", TetrisBox)
customElements.define("tetris-piece", TetrisPiece)
