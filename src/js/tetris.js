// Tetris pieces setup
const pieces = [
  { name: "i", width: 1, height: 4, color: "#00f0f0" },
  { name: "o", width: 2, height: 2, color: "#f0f000" },
  { name: "t", width: 3, height: 2, color: "#a000f0" },
  { name: "s", width: 3, height: 2, color: "#00f000" },
  { name: "z", width: 3, height: 2, color: "#f00000" },
  { name: "j", width: 2, height: 3, color: "#0000f0" },
  { name: "l", width: 2, height: 3, color: "#f0a000" },
]

const blockSize = 25 // Each individual block is 25px

// Check if two rectangles overlap
function rectsOverlap(rect1, rect2, padding = 10) {
  return !(
    rect1.right + padding < rect2.left ||
    rect1.left - padding > rect2.right ||
    rect1.bottom + padding < rect2.top ||
    rect1.top - padding > rect2.bottom
  )
}

// Find a non-overlapping position for a piece
function findNonOverlappingPosition(
  piece,
  placedPieces,
  container,
  maxAttempts = 50
) {
  const containerRect = container.getBoundingClientRect()

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
    const width = piece.width * blockSize
    const height = piece.height * blockSize

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
      right: x + piece.width * blockSize,
      bottom: y + piece.height * blockSize,
    },
  }
}

function createTetrisPieces() {
  const tetrisElement = document.getElementById("tetris")
  if (!tetrisElement) {
    console.warn("Tetris element not found")
    return
  }

  // Clear any existing pieces
  tetrisElement.innerHTML = ""

  // Add text content back
  const statement = document.createElement("h2")
  statement.className = "statement"
  statement.innerHTML = `I'm a multifaceted individual contributor and community leader.<br/>
    <br/><em>I don't fit in a box anymore.</em>`
  tetrisElement.appendChild(statement)

  // Track placed pieces for collision detection
  const placedPieces = []

  // Create each piece as a positioned image element
  pieces.forEach((piece, index) => {
    const img = document.createElement("img")
    img.src = `/img/tetris-${piece.name}.svg`
    img.alt = `Tetris ${piece.name} piece`
    img.className = "tetris-piece"
    // random rotation of 0, 90, 180, or 270 degrees
    const rotations = [0, 90, 180, 270]
    const randomRotation =
      rotations[Math.floor(Math.random() * rotations.length)]
    img.dataset.rotation = randomRotation
    img.style.transform = `rotate(${randomRotation}deg)`
    img.style.position = "absolute"
    img.style.width = `${piece.width * blockSize}px`
    img.style.height = `${piece.height * blockSize}px`
    img.style.cursor = "pointer"
    // img.style.transition = "transform 0.3s ease"

    // Find non-overlapping position
    const position = findNonOverlappingPosition(
      piece,
      placedPieces,
      tetrisElement
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

    tetrisElement.appendChild(img)
  })
}

function createTetrisFooter() {
  // Grab #tetris-footer and generate a SINGLE tetris piece there
  const tetrisFooter = document.getElementById("tetris-footer")
  if (tetrisFooter) {
    const piece = pieces[Math.floor(Math.random() * pieces.length)]
    const img = document.createElement("img")
    img.src = `/img/tetris-${piece.name}.svg`
    img.alt = `Tetris ${piece.name} piece`
    img.className = "tetris-piece-footer"
    img.style.width = `${piece.width * blockSize}px`
    img.style.height = `${piece.height * blockSize}px`
    tetrisFooter.appendChild(img)
  }
}

// Run on page load - handle both cases where DOM might already be loaded or not
function init() {
  // Wait for next tick to ensure DOM is fully ready
  setTimeout(() => {
    createTetrisPieces()
    createTetrisFooter()
  }, 0)
}

if (document.readyState === "loading") {
  console.log("DOM not ready, adding listener")
  document.addEventListener("DOMContentLoaded", init)
} else {
  // DOM already loaded, run immediately
  console.log("DOM ready, running init()")
  init()
}
