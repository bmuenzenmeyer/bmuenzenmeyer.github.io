// <tetris-game> Web Component
// A fully playable Tetris game using Canvas rendering
// Usage: <tetris-game></tetris-game>

class TetrisGame extends HTMLElement {
  // Standard Tetris board: 10 columns x 20 visible rows (+ 2 hidden buffer rows at top)
  static COLS = 10;
  static ROWS = 22; // 20 visible + 2 buffer
  static VISIBLE_ROWS = 20;

  // Tetromino definitions using standard Tetris colors
  // Each piece has 4 rotation states (SRS - Super Rotation System)
  static PIECES = {
    I: {
      color: '#00f0f0',
      shapes: [
        [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
        [[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]],
        [[0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0]],
        [[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]],
      ],
    },
    O: {
      color: '#f0f000',
      shapes: [
        [[1,1],[1,1]],
        [[1,1],[1,1]],
        [[1,1],[1,1]],
        [[1,1],[1,1]],
      ],
    },
    T: {
      color: '#a000f0',
      shapes: [
        [[0,1,0],[1,1,1],[0,0,0]],
        [[0,1,0],[0,1,1],[0,1,0]],
        [[0,0,0],[1,1,1],[0,1,0]],
        [[0,1,0],[1,1,0],[0,1,0]],
      ],
    },
    S: {
      color: '#00f000',
      shapes: [
        [[0,1,1],[1,1,0],[0,0,0]],
        [[0,1,0],[0,1,1],[0,0,1]],
        [[0,0,0],[0,1,1],[1,1,0]],
        [[1,0,0],[1,1,0],[0,1,0]],
      ],
    },
    Z: {
      color: '#f00000',
      shapes: [
        [[1,1,0],[0,1,1],[0,0,0]],
        [[0,0,1],[0,1,1],[0,1,0]],
        [[0,0,0],[1,1,0],[0,1,1]],
        [[0,1,0],[1,1,0],[1,0,0]],
      ],
    },
    J: {
      color: '#0000f0',
      shapes: [
        [[1,0,0],[1,1,1],[0,0,0]],
        [[0,1,1],[0,1,0],[0,1,0]],
        [[0,0,0],[1,1,1],[0,0,1]],
        [[0,1,0],[0,1,0],[1,1,0]],
      ],
    },
    L: {
      color: '#f0a000',
      shapes: [
        [[0,0,1],[1,1,1],[0,0,0]],
        [[0,1,0],[0,1,0],[0,1,1]],
        [[0,0,0],[1,1,1],[1,0,0]],
        [[1,1,0],[0,1,0],[0,1,0]],
      ],
    },
  };

  // SRS wall kick data for J, L, S, T, Z pieces
  static WALL_KICKS = {
    '0>1': [[0,0],[-1,0],[-1,1],[0,-2],[-1,-2]],
    '1>0': [[0,0],[1,0],[1,-1],[0,2],[1,2]],
    '1>2': [[0,0],[1,0],[1,-1],[0,2],[1,2]],
    '2>1': [[0,0],[-1,0],[-1,1],[0,-2],[-1,-2]],
    '2>3': [[0,0],[1,0],[1,1],[0,-2],[1,-2]],
    '3>2': [[0,0],[-1,0],[-1,-1],[0,2],[-1,2]],
    '3>0': [[0,0],[-1,0],[-1,-1],[0,2],[-1,2]],
    '0>3': [[0,0],[1,0],[1,1],[0,-2],[1,-2]],
  };

  // SRS wall kick data for I piece
  static I_WALL_KICKS = {
    '0>1': [[0,0],[-2,0],[1,0],[-2,-1],[1,2]],
    '1>0': [[0,0],[2,0],[-1,0],[2,1],[-1,-2]],
    '1>2': [[0,0],[-1,0],[2,0],[-1,2],[2,-1]],
    '2>1': [[0,0],[1,0],[-2,0],[1,-2],[-2,1]],
    '2>3': [[0,0],[2,0],[-1,0],[2,1],[-1,-2]],
    '3>2': [[0,0],[-2,0],[1,0],[-2,-1],[1,2]],
    '3>0': [[0,0],[1,0],[-2,0],[1,-2],[-2,1]],
    '0>3': [[0,0],[-1,0],[2,0],[-1,2],[2,-1]],
  };

  // Gravity speeds per level (frames per drop) — NES-style curve
  static GRAVITY = [48, 43, 38, 33, 28, 23, 18, 13, 8, 6, 5, 5, 5, 4, 4, 4, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1];

  constructor() {
    super();
    this._animFrameId = null;
    this._keydownHandler = null;
    this._keyupHandler = null;
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this._buildDOM();
    this._initGame();
    this._bindInput();
    this._showStartScreen();
  }

  disconnectedCallback() {
    this._cleanup();
  }

  _cleanup() {
    if (this._animFrameId) cancelAnimationFrame(this._animFrameId);
    if (this._keydownHandler) document.removeEventListener('keydown', this._keydownHandler);
    if (this._keyupHandler) document.removeEventListener('keyup', this._keyupHandler);
  }

  _buildDOM() {
    const cellSize = parseInt(this.getAttribute('cell-size') || '30', 10);
    this._cellSize = cellSize;

    const boardW = TetrisGame.COLS * cellSize;
    const boardH = TetrisGame.VISIBLE_ROWS * cellSize;
    const previewCells = 4;
    const previewSize = previewCells * cellSize;
    const sideW = Math.max(previewSize + 20, 220);

    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: block;
        font-family: 'Press Start 2P', monospace, system-ui;
        color: #fff;
        user-select: none;
        -webkit-user-select: none;
      }
      .tetris-wrapper {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        gap: 16px;
      }
      canvas {
        image-rendering: pixelated;
        border: 2px solid #555;
        background: #111;
      }
      .side-panel {
        display: flex;
        flex-direction: column;
        gap: 12px;
        width: ${sideW}px;
      }
      .panel-box {
        background: #1a1a2e;
        border: 2px solid #555;
        border-radius: 4px;
        padding: 8px;
        text-align: center;
      }
      .panel-box h3 {
        font-size: 10px;
        margin: 0 0 8px 0;
        color: #aaa;
        letter-spacing: 1px;
        text-transform: uppercase;
      }
      .panel-box .value {
        font-size: 16px;
        font-weight: bold;
      }
      .preview-canvas {
        border: none;
        background: transparent;
        display: block;
        margin: 0 auto;
      }
      .overlay {
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: rgba(0,0,0,0.75);
        z-index: 10;
        gap: 16px;
      }
      .overlay.hidden { display: none; }
      .overlay h2 {
        font-size: 18px;
        margin: 0;
        text-shadow: 2px 2px 0 #000;
      }
      .overlay p {
        font-size: 10px;
        color: #ccc;
        margin: 0;
        line-height: 1.8;
        text-align: center;
      }
      .overlay .blink {
        animation: blink 1s step-end infinite;
      }
      @keyframes blink {
        50% { opacity: 0; }
      }
      .board-container {
        position: relative;
        width: ${boardW + 4}px;
        height: ${boardH + 4}px;
      }
      .controls-hint {
        font-size: 9px;
        color: #777;
        text-align: left;
        margin-top: 8px;
        line-height: 2.2;
      }
      .controls-hint .key {
        color: #aaa;
      }
    `;

    const wrapper = document.createElement('div');
    wrapper.className = 'tetris-wrapper';

    // Board container (canvas + overlay)
    const boardContainer = document.createElement('div');
    boardContainer.className = 'board-container';

    const canvas = document.createElement('canvas');
    canvas.width = boardW;
    canvas.height = boardH;
    this._canvas = canvas;
    this._ctx = canvas.getContext('2d');

    // Overlay for start/pause/game-over
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    this._overlay = overlay;

    boardContainer.appendChild(canvas);
    boardContainer.appendChild(overlay);

    // Side panel
    const side = document.createElement('div');
    side.className = 'side-panel';

    // Next piece preview
    const nextBox = document.createElement('div');
    nextBox.className = 'panel-box';
    nextBox.innerHTML = '<h3>Next</h3>';
    const previewCanvas = document.createElement('canvas');
    previewCanvas.className = 'preview-canvas';
    previewCanvas.width = previewSize;
    previewCanvas.height = previewSize;
    this._previewCanvas = previewCanvas;
    this._previewCtx = previewCanvas.getContext('2d');
    nextBox.appendChild(previewCanvas);
    side.appendChild(nextBox);

    // Score
    const scoreBox = document.createElement('div');
    scoreBox.className = 'panel-box';
    scoreBox.innerHTML = '<h3>Score</h3><div class="value" id="score">0</div>';
    this._scoreEl = scoreBox.querySelector('#score');
    side.appendChild(scoreBox);

    // Level
    const levelBox = document.createElement('div');
    levelBox.className = 'panel-box';
    levelBox.innerHTML = '<h3>Level</h3><div class="value" id="level">1</div>';
    this._levelEl = levelBox.querySelector('#level');
    side.appendChild(levelBox);

    // Lines
    const linesBox = document.createElement('div');
    linesBox.className = 'panel-box';
    linesBox.innerHTML = '<h3>Lines</h3><div class="value" id="lines">0</div>';
    this._linesEl = linesBox.querySelector('#lines');
    side.appendChild(linesBox);

    // Controls hint
    const hint = document.createElement('div');
    hint.className = 'controls-hint';
    hint.innerHTML = '<span class="key">← →</span> Move<br><span class="key">↓</span> Soft Drop<br><span class="key">↑</span> Rotate<br><span class="key">Z</span> Counter-rotate<br><span class="key">Space</span> Hard Drop<br><span class="key">P</span> Pause';
    side.appendChild(hint);

    wrapper.appendChild(boardContainer);
    wrapper.appendChild(side);

    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(wrapper);
  }

  _initGame() {
    this._board = this._createBoard();
    this._score = 0;
    this._lines = 0;
    this._level = 1;
    this._gameOver = false;
    this._paused = false;
    this._running = false;
    this._frameCount = 1; // start at 1 to avoid immediate drop on frame 0
    this._lockDelay = 0;
    this._maxLockDelay = 30; // frames of grace before locking
    this._lockMoves = 0;
    this._maxLockMoves = 15; // max moves/rotations during lock delay
    this._softDropping = false;
    this._das = { left: 0, right: 0, threshold: 10, repeat: 2 };
    this._keysDown = new Set();

    // 7-bag randomizer
    this._bag = [];
    this._nextPiece = this._getNextFromBag();
    this._spawnPiece();

    this._lineClearAnim = null; // { rows: [...], frame: 0, maxFrames: 20 }
  }

  _createBoard() {
    const board = [];
    for (let r = 0; r < TetrisGame.ROWS; r++) {
      board.push(new Array(TetrisGame.COLS).fill(null));
    }
    return board;
  }

  // 7-bag randomizer: shuffle all 7 pieces, deal one at a time
  _getNextFromBag() {
    if (this._bag.length === 0) {
      this._bag = Object.keys(TetrisGame.PIECES).slice();
      // Fisher-Yates shuffle
      for (let i = this._bag.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this._bag[i], this._bag[j]] = [this._bag[j], this._bag[i]];
      }
    }
    return this._bag.pop();
  }

  _spawnPiece() {
    const name = this._nextPiece;
    this._nextPiece = this._getNextFromBag();

    const piece = TetrisGame.PIECES[name];
    const shape = piece.shapes[0];

    this._current = {
      name,
      color: piece.color,
      rotation: 0,
      shape,
      // Center horizontally, top of board (in buffer zone)
      x: Math.floor((TetrisGame.COLS - shape[0].length) / 2),
      y: 0,
    };

    // If spawn position collides, game over
    if (this._collides(this._current.shape, this._current.x, this._current.y)) {
      this._gameOver = true;
      this._running = false;
      this._showGameOver();
    }

    this._lockDelay = 0;
    this._lockMoves = 0;
  }

  _collides(shape, px, py) {
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (!shape[r][c]) continue;
        const bx = px + c;
        const by = py + r;
        if (bx < 0 || bx >= TetrisGame.COLS || by >= TetrisGame.ROWS) return true;
        if (by >= 0 && this._board[by][bx] !== null) return true;
      }
    }
    return false;
  }

  _lock() {
    const { shape, x, y, color } = this._current;
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (!shape[r][c]) continue;
        const bx = x + c;
        const by = y + r;
        if (by >= 0 && by < TetrisGame.ROWS && bx >= 0 && bx < TetrisGame.COLS) {
          this._board[by][bx] = color;
        }
      }
    }

    // Check for line clears
    const fullRows = [];
    for (let r = 0; r < TetrisGame.ROWS; r++) {
      if (this._board[r].every(cell => cell !== null)) {
        fullRows.push(r);
      }
    }

    if (fullRows.length > 0) {
      // Start line clear animation
      this._lineClearAnim = { rows: fullRows, frame: 0, maxFrames: 20 };
    } else {
      this._spawnPiece();
    }
  }

  _clearLines(rows) {
    // Remove rows from bottom to top
    const sorted = rows.slice().sort((a, b) => b - a);
    for (const row of sorted) {
      this._board.splice(row, 1);
      this._board.unshift(new Array(TetrisGame.COLS).fill(null));
    }

    const count = rows.length;
    this._lines += count;

    // Standard scoring: 100, 300, 500, 800 per 1-4 lines
    const points = [0, 100, 300, 500, 800];
    this._score += (points[count] || 800) * this._level;

    // Level up every 10 lines
    this._level = Math.floor(this._lines / 10) + 1;

    this._updateUI();
  }

  _getGravity() {
    const idx = Math.min(this._level - 1, TetrisGame.GRAVITY.length - 1);
    return TetrisGame.GRAVITY[idx];
  }

  _move(dx, dy) {
    const nx = this._current.x + dx;
    const ny = this._current.y + dy;
    if (!this._collides(this._current.shape, nx, ny)) {
      this._current.x = nx;
      this._current.y = ny;

      // Reset lock delay on successful move (if on ground)
      if (dy === 0 && this._lockDelay > 0 && this._lockMoves < this._maxLockMoves) {
        this._lockDelay = 0;
        this._lockMoves++;
      }
      return true;
    }
    return false;
  }

  _rotate(dir = 1) {
    const { name, rotation } = this._current;
    const piece = TetrisGame.PIECES[name];
    const newRot = (rotation + dir + 4) % 4;
    const newShape = piece.shapes[newRot];

    // SRS wall kicks
    const kickKey = `${rotation}>${newRot}`;
    const kicks = name === 'I' ? TetrisGame.I_WALL_KICKS[kickKey] : TetrisGame.WALL_KICKS[kickKey];

    if (!kicks) return false;

    for (const [kx, ky] of kicks) {
      if (!this._collides(newShape, this._current.x + kx, this._current.y - ky)) {
        this._current.x += kx;
        this._current.y -= ky;
        this._current.shape = newShape;
        this._current.rotation = newRot;

        // Reset lock delay on successful rotation
        if (this._lockDelay > 0 && this._lockMoves < this._maxLockMoves) {
          this._lockDelay = 0;
          this._lockMoves++;
        }
        return true;
      }
    }
    return false;
  }

  _hardDrop() {
    let dropped = 0;
    while (this._move(0, 1)) dropped++;
    this._score += dropped * 2;
    this._updateUI();
    this._lock();
  }

  _getGhostY() {
    let gy = this._current.y;
    while (!this._collides(this._current.shape, this._current.x, gy + 1)) {
      gy++;
    }
    return gy;
  }

  // --- Input ---
  _bindInput() {
    this._keydownHandler = (e) => {
      if (!this._running) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this._startGame();
        }
        return;
      }

      if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') {
        e.preventDefault();
        this._togglePause();
        return;
      }

      if (this._paused || this._gameOver) return;

      this._keysDown.add(e.key);

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          if (this._das.left === 0) this._move(-1, 0);
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (this._das.right === 0) this._move(1, 0);
          break;
        case 'ArrowUp':
          e.preventDefault();
          this._rotate(1);
          break;
        case 'z':
        case 'Z':
          e.preventDefault();
          this._rotate(-1);
          break;
        case 'ArrowDown':
          e.preventDefault();
          this._softDropping = true;
          break;
        case ' ':
          e.preventDefault();
          this._hardDrop();
          break;
      }
    };

    this._keyupHandler = (e) => {
      this._keysDown.delete(e.key);
      if (e.key === 'ArrowDown') this._softDropping = false;
      if (e.key === 'ArrowLeft') this._das.left = 0;
      if (e.key === 'ArrowRight') this._das.right = 0;
    };

    document.addEventListener('keydown', this._keydownHandler);
    document.addEventListener('keyup', this._keyupHandler);
  }

  _handleDAS() {
    // Delayed Auto Shift for left/right
    if (this._keysDown.has('ArrowLeft')) {
      this._das.left++;
      if (this._das.left > this._das.threshold && (this._das.left - this._das.threshold) % this._das.repeat === 0) {
        this._move(-1, 0);
      }
    }
    if (this._keysDown.has('ArrowRight')) {
      this._das.right++;
      if (this._das.right > this._das.threshold && (this._das.right - this._das.threshold) % this._das.repeat === 0) {
        this._move(1, 0);
      }
    }
  }

  // --- Game Loop ---
  _startGame() {
    this._initGame();
    this._running = true;
    this._paused = false;
    this._overlay.classList.add('hidden');
    this._updateUI();
    this._lastTime = performance.now();
    this._accumulator = 0;
    this._frameMs = 1000 / 60; // 60fps logical frames
    this._loop(performance.now());
  }

  _togglePause() {
    if (this._gameOver) return;
    this._paused = !this._paused;
    if (this._paused) {
      this._showPauseScreen();
    } else {
      this._overlay.classList.add('hidden');
      this._lastTime = performance.now();
      this._accumulator = 0;
    }
  }

  _loop(now) {
    if (!this._running || this._gameOver) return;
    if (this._paused) {
      this._animFrameId = requestAnimationFrame((t) => this._loop(t));
      return;
    }

    const dt = now - this._lastTime;
    this._lastTime = now;
    this._accumulator += dt;

    while (this._accumulator >= this._frameMs) {
      this._tick();
      this._accumulator -= this._frameMs;
    }

    this._render();
    this._renderPreview();
    this._animFrameId = requestAnimationFrame((t) => this._loop(t));
  }

  _tick() {
    // Handle line clear animation
    if (this._lineClearAnim) {
      this._lineClearAnim.frame++;
      if (this._lineClearAnim.frame >= this._lineClearAnim.maxFrames) {
        this._clearLines(this._lineClearAnim.rows);
        this._lineClearAnim = null;
        this._spawnPiece();
      }
      return;
    }

    this._frameCount++;
    this._handleDAS();

    // Gravity
    let gravityFrames = this._getGravity();
    if (this._softDropping) gravityFrames = Math.min(gravityFrames, 2);

    if (this._frameCount % gravityFrames === 0) {
      if (!this._move(0, 1)) {
        // Piece can't move down — start/continue lock delay
        // (lock delay also ticks below, outside gravity check)
      } else {
        this._lockDelay = 0;
        if (this._softDropping) {
          this._score += 1;
          this._updateUI();
        }
      }
    }

    // Lock delay ticks every frame (not just on gravity frames)
    if (this._collides(this._current.shape, this._current.x, this._current.y + 1)) {
      this._lockDelay++;
      if (this._lockDelay >= this._maxLockDelay || this._lockMoves >= this._maxLockMoves) {
        this._lock();
      }
    }
  }

  // --- Rendering ---
  _render() {
    const ctx = this._ctx;
    const cs = this._cellSize;
    const offsetY = 2; // skip buffer rows

    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);

    // Draw grid lines (subtle)
    ctx.strokeStyle = '#1a1a2e';
    ctx.lineWidth = 0.5;
    for (let c = 1; c < TetrisGame.COLS; c++) {
      ctx.beginPath();
      ctx.moveTo(c * cs, 0);
      ctx.lineTo(c * cs, this._canvas.height);
      ctx.stroke();
    }
    for (let r = 1; r < TetrisGame.VISIBLE_ROWS; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * cs);
      ctx.lineTo(this._canvas.width, r * cs);
      ctx.stroke();
    }

    // Draw locked blocks
    for (let r = offsetY; r < TetrisGame.ROWS; r++) {
      for (let c = 0; c < TetrisGame.COLS; c++) {
        const color = this._board[r][c];
        if (color) {
          // If in line clear animation, flash these rows
          if (this._lineClearAnim && this._lineClearAnim.rows.includes(r)) {
            const flash = Math.floor(this._lineClearAnim.frame / 4) % 2 === 0;
            this._drawBlock(ctx, c, r - offsetY, flash ? '#fff' : color);
          } else {
            this._drawBlock(ctx, c, r - offsetY, color);
          }
        }
      }
    }

    if (this._lineClearAnim || this._gameOver) return;

    // Draw ghost piece
    const ghostY = this._getGhostY();
    const { shape, x, color } = this._current;
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (!shape[r][c]) continue;
        const dy = ghostY + r - offsetY;
        if (dy >= 0) {
          this._drawBlock(ctx, x + c, dy, color, 0.2);
        }
      }
    }

    // Draw current piece
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (!shape[r][c]) continue;
        const dy = this._current.y + r - offsetY;
        if (dy >= 0) {
          this._drawBlock(ctx, x + c, dy, color);
        }
      }
    }
  }

  _drawBlock(ctx, x, y, color, alpha = 1) {
    const cs = this._cellSize;
    const px = x * cs;
    const py = y * cs;

    ctx.globalAlpha = alpha;

    // Fill
    ctx.fillStyle = color;
    ctx.fillRect(px + 1, py + 1, cs - 2, cs - 2);

    // Highlight (top-left shine)
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.fillRect(px + 1, py + 1, cs - 2, 3);
    ctx.fillRect(px + 1, py + 1, 3, cs - 2);

    // Shadow (bottom-right)
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(px + 1, py + cs - 4, cs - 2, 3);
    ctx.fillRect(px + cs - 4, py + 1, 3, cs - 2);

    // Border
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.strokeRect(px + 0.5, py + 0.5, cs - 1, cs - 1);

    ctx.globalAlpha = 1;
  }

  _renderPreview() {
    const ctx = this._previewCtx;
    const cs = this._cellSize;
    const canvas = this._previewCanvas;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const name = this._nextPiece;
    const piece = TetrisGame.PIECES[name];
    const shape = piece.shapes[0];

    // Center the preview piece
    const pw = shape[0].length * cs;
    const ph = shape.length * cs;
    const ox = (canvas.width - pw) / 2;
    const oy = (canvas.height - ph) / 2;

    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (!shape[r][c]) continue;
        const px = ox + c * cs;
        const py = oy + r * cs;

        ctx.fillStyle = piece.color;
        ctx.fillRect(px + 1, py + 1, cs - 2, cs - 2);

        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.fillRect(px + 1, py + 1, cs - 2, 3);
        ctx.fillRect(px + 1, py + 1, 3, cs - 2);

        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.fillRect(px + 1, py + cs - 4, cs - 2, 3);
        ctx.fillRect(px + cs - 4, py + 1, 3, cs - 2);

        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1;
        ctx.strokeRect(px + 0.5, py + 0.5, cs - 1, cs - 1);
      }
    }
  }

  _updateUI() {
    this._scoreEl.textContent = this._score.toLocaleString();
    this._levelEl.textContent = this._level;
    this._linesEl.textContent = this._lines;
  }

  // --- Overlays ---
  _showStartScreen() {
    this._overlay.classList.remove('hidden');
    this._overlay.innerHTML = `
      <h2>BLOCK DROP</h2>
      <p class="blink">Press ENTER or SPACE to start</p>
      <p>← → Move<br>↓ Soft Drop<br>↑ Rotate &nbsp; Z Counter-rotate<br>Space Hard Drop &nbsp; P Pause</p>
    `;
    this._render();
    this._renderPreview();
  }

  _showPauseScreen() {
    this._overlay.classList.remove('hidden');
    this._overlay.innerHTML = `
      <h2>PAUSED</h2>
      <p class="blink">Press P or ESC to resume</p>
    `;
  }

  _showGameOver() {
    this._overlay.classList.remove('hidden');
    this._overlay.innerHTML = `
      <h2>GAME OVER</h2>
      <p>Score: ${this._score.toLocaleString()}<br>
      Lines: ${this._lines} &nbsp; Level: ${this._level}</p>
      <p class="blink">Press ENTER or SPACE to play again</p>
    `;
  }
}

customElements.define('tetris-game', TetrisGame);
