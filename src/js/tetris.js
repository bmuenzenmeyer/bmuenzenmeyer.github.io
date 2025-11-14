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

function createTetrisPieces() {
  const tetrisElement = document.getElementById("tetris")
  if (!tetrisElement) return

  // Clear any existing pieces
  tetrisElement.innerHTML = ""

  // Add text content back
  const statement = document.createElement("h2")
  statement.className = "statement"
  statement.innerHTML = `I'm a multifaceted individual contributor and leader.<br/>
    Don't put me in a box.`
  tetrisElement.appendChild(statement)

  // Create each piece as a positioned image element
  pieces.forEach((piece, index) => {
    const img = document.createElement("img")
    img.src = `/img/tetris-${piece.name}.svg`
    img.alt = `Tetris ${piece.name} piece`
    img.className = "tetris-piece"
    img.dataset.rotation = 0
    img.style.position = "absolute"
    img.style.width = `${piece.width * blockSize}px`
    img.style.height = `${piece.height * blockSize}px`
    img.style.cursor = "pointer"
    // img.style.transition = "transform 0.3s ease"

    // Random position
    const x = Math.floor(Math.random() * (100 - piece.width * 5))
    const y = Math.floor(Math.random() * (100 - piece.height * 5))
    img.style.left = `${x}%`
    img.style.top = `${Math.random() > 0.5 ? y : -y}%`

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

// Run on page load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", createTetrisPieces)
} else {
  createTetrisPieces()
}
