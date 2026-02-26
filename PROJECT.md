# Battle City (Tank 1990) - JavaScript Remake

## Project Overview

This is a JavaScript/HTML5 Canvas remake of the classic NES game **Battle City** (also known as Tank 1990). The game is implemented using vanilla JavaScript with canvas-based rendering and runs directly in the browser without any build system or external dependencies.

### Architecture

The project follows a classic object-oriented game architecture:

- **Game Loop**: Runs at 240 FPS with delta-time calculations for smooth movement
- **Entity System**: All game objects inherit from `GameObject` base class
- **Component-based rendering**: Sprites loaded from a spritesheet (`img/sprites_tp_fixed.png`)
- **Level System**: 35 stages loaded from binary `.bin` files in the `stages/` directory

### Core Technologies

- HTML5 Canvas for rendering
- Vanilla JavaScript (ES5/ES6 mix)
- XMLHttpRequest for loading stage binary data
- No build tools or package managers required

## Project Structure

```
captain97r.github.io/
├── index.html          # Main entry point, loads all scripts
├── img/                # Game assets (spritesheets)
│   ├── sprites_tp_fixed.png    # Main spritesheet
│   └── ...
├── src/                # Source code
│   ├── battlecity.js   # Game initialization and main loop
│   ├── Game.js         # Main game class (update, input handling)
│   ├── GameObject.js   # Base class for all game objects
│   ├── Tank.js         # Tank base class
│   ├── Player.js       # Player-controlled tank
│   ├── Bullet.js       # Bullet/projectile logic
│   ├── LevelBuilder.js # Parses binary stage data and builds levels
│   ├── ObjectContainer.js  # Manages all game objects
│   ├── Globals.js      # Global configuration and constants
│   ├── ObjectEnum.js   # Enum definitions for map blocks and tiles
│   └── ...
├── stages/             # Binary stage files (stage_01.bin - stage_35.bin, stage_FF.bin)
└── fun/                # Mini-games/experiments (ball.js, ball_interval.js)
```

## Script Loading Order

Scripts are loaded in `index.html` in a specific dependency order:

```html
<!-- Core infrastructure -->
<script src="src/EventManager.js"></script>
<script src="src/ObjectsJson.js"></script>      <!-- Defines ObjectsJson variable -->
<script src="src/GameObject.js"></script>
<script src="src/ObjectContainer.js"></script>

<!-- Game entities -->
<script src="src/Tank.js"></script>
<script src="src/Water.js"></script>
<script src="src/Ice.js"></script>
<script src="src/Grass.js"></script>
<script src="src/BrickWall.js"></script>
<script src="src/ConcreteWall.js"></script>

<!-- Utilities -->
<script src="src/Direction.js"></script>
<script src="src/Game.js"></script>
<script src="src/Globals.js"></script>
<script src="src/LevelBuilder.js"></script>
<script src="src/ObjectEnum.js"></script>
<script src="src/Player.js"></script>
<script src="src/Bullet.js"></script>

<!-- Main entry (ES6 module) -->
<script type="module" src="src/battlecity.js"></script>
```

**Key dependencies:**
- `Globals.js` depends on `ObjectsJson.js` (parses JSON into `Globals.objects`)
- `Tank.js` depends on `GameObject.js` and `Direction.js`
- `Player.js` depends on `Tank.js`
- `Bullet.js` depends on `GameObject.js` and `Direction.js`
- `battlecity.js` depends on all of the above + `Game.js`

## Module System

### Hybrid Module Architecture

The project uses a **hybrid approach** combining traditional script loading with ES6 modules:

| File | Type | Loading Method |
|------|------|----------------|
| All `src/*.js` files | Traditional script | `<script src="...">` |
| `src/battlecity.js` | ES6 Module | `<script type="module" src="...">` |

### How It Works

1. **Traditional Scripts (Global Namespace)**
   
   All core game files are loaded as classic scripts that share the **global namespace**:
   ```html
   <script src="src/GameObject.js"></script>
   <script src="src/Tank.js"></script>
   <script src="src/Game.js"></script>
   ```
   
   - Classes are defined globally (e.g., `class Game {}`, `class Tank {}`)
   - No `import`/`export` statements
   - Dependencies resolved by load order in `index.html`
   - Globals object defined in `Globals.js` is accessible everywhere

2. **ES6 Module (battlecity.js)**
   
   The main entry point is loaded as an ES6 module:
   ```html
   <script type="module" src="src/battlecity.js"></script>
   ```
   
   **Why use a module here?**
   - Modules have their own **scope** (no global namespace pollution)
   - Can use `import`/`export` if needed in the future
   - Automatically deferred execution (runs after DOM is ready)
   - Can access all globally-defined classes (`Game`, `Globals`, etc.)

### Module Access Pattern

Even though `battlecity.js` is an ES6 module, it accesses classes from the global scope:

```javascript
// battlecity.js - ES6 module accessing global classes
xmlhttp.addEventListener("loadend", Game.loaded, false);  // Game is global
Globals.currentStageBinary = byteArray;                   // Globals is global

window.onload = function () {
    let game = new Game(ctx);  // Game constructor from global scope
};
```

### Key Differences

| Aspect | Traditional Scripts | ES6 Module (battlecity.js) |
|--------|--------------------|---------------------------|
| Scope | Global | Module-local |
| `this` at top level | `window` object | `undefined` |
| `import`/`export` | Not available | Available |
| Execution timing | Immediate (blocks parsing) | Deferred (after DOM) |
| Can access globals | Yes | Yes |
| Creates globals | Yes | No |

### Why This Hybrid Approach?

1. **Legacy code compatibility** - Most files use classic script patterns
2. **Easy refactoring path** - Can migrate files to ES6 modules incrementally
3. **Main entry isolation** - `battlecity.js` doesn't pollute global scope
4. **Future-proof** - Can add `import`/`export` as needed

### Migration to Full ES6 Modules

To fully migrate to ES6 modules, each file would need:

```javascript
// src/Tank.js (current)
class Tank extends GameObject { ... }

// src/Tank.js (ES6 module version)
import { GameObject } from './GameObject.js';
import { Direction } from './Direction.js';

export class Tank extends GameObject { ... }
```

And `index.html` would need updating:
```html
<script type="module" src="src/battlecity.js"></script>
<!-- Remove all other <script> tags -->
```

## Sprite System

### Spritesheet Layout

All sprites are extracted from a single spritesheet: `img/sprites_tp_fixed.png`

The spritesheet is loaded in `Globals.js`:
```javascript
Globals.spriteSheet = new Image();
Globals.spriteSheet.src = "img/sprites_tp_fixed.png";
```

### Sprite Configuration via JSON

Sprite coordinates are defined in `ObjectsJson.js` as a JSON structure that maps object types to their positions on the spritesheet:

**Structure:**
```javascript
{
    "tanks": {
        "animationFrames": 2,
        "objectSizeX": 32,
        "objectSizeY": 32,
        "friendlyTank": {
            "types": {
                "stock": {
                    "animation": {
                        "up": { "frameX": [0, 32], "frameY": [0, 0] }
                        // ... other directions
                    }
                }
            }
        }
    },
    "bullets": { ... },
    "walls": { ... }
}
```

### How Sprites Are Extracted

1. **JSON Parsing**: `ObjectsJson.js` contains a template literal with JSON that is parsed in `Globals.js`:
   ```javascript
   Globals.objects = JSON.parse(ObjectsJson);
   ```

2. **Frame Coordinates**: Each sprite is defined by:
   - `frameX`: Array of X coordinates on the spritesheet (one per animation frame)
   - `frameY`: Array of Y coordinates on the spritesheet

3. **Example - Tank Animation**:
   ```javascript
   // From ObjectsJson.js - friendly tank "stock" type
   "up": {
       "frameX": [0, 32],   // Frame 0: X=0, Frame 1: X=32
       "frameY": [0, 0]     // Both frames: Y=0
   }
   ```
   This means the tank facing UP has 2 animation frames:
   - Frame 0: sprite at (0, 0) on spritesheet
   - Frame 1: sprite at (32, 0) on spritesheet

4. **Example - Bullet Direction**:
   ```javascript
   "bullets": {
       "up":    { "frameX": [0],  "frameY": [352] },
       "right": { "frameX": [8],  "frameY": [352] },
       "down":  { "frameX": [16], "frameY": [352] },
       "left":  { "frameX": [24], "frameY": [352] }
   }
   ```
   Bullets are 8×8 pixels, positioned at Y=352 on the spritesheet.

### Rendering Process

The `GameObject.draw()` method uses Canvas API's `drawImage()` to extract and render sprites:

```javascript
context.drawImage(
    Globals.spriteSheet,    // Source image
    this._activeFrameX,     // Source X on spritesheet
    this._activeFrameY,     // Source Y on spritesheet
    this._width,            // Source width
    this._height,           // Source height
    this._posX,             // Destination X on canvas
    this._posY,             // Destination Y on canvas
    this._width,            // Destination width
    this._height            // Destination height
);
```

### Animation System

Animation is handled in `Tank.update()`:
```javascript
this.frameTime -= this.dt;
if (this.frameTime < 0) {
    this._currentFrame++;           // Advance to next frame
    this.frameTime = this.frameTimeLimit;  // Reset timer
}
this.setActiveFrame(this.direction, this._currentFrame % this._animationFrames);
```

The `setActiveFrame()` method looks up the correct coordinates from the JSON config:
```javascript
this._activeFrameX = this._frameContainer.up.frameX[frame];
this._activeFrameY = this._frameContainer.up.frameY[frame];
```

## Building and Running

### Running the Game

No build step required. Simply open `index.html` in a web browser:

```bash
# Option 1: Open directly in browser
start index.html

# Option 2: Use a local server (recommended for XHR to work properly)
python -m http.server 8000
# Then navigate to http://localhost:8000
```

**Note**: Due to browser CORS policies, loading binary stage files via `XMLHttpRequest` requires running a local web server instead of opening the file directly.

### Controls

| Key | Action |
|-----|--------|
| W | Move Up |
| S | Move Down |
| A | Move Left |
| D | Move Right |
| Space | Fire |

## Key Classes

| Class | Description |
|-------|-------------|
| `Game` | Main game controller, handles input, update loop, and rendering |
| `Tank` | Base class for all tanks with movement and firing logic |
| `Player` | Player-controlled tank with key state management |
| `Bullet` | Projectile with collision detection |
| `LevelBuilder` | Parses binary stage data and instantiates level objects |
| `ObjectContainer` | Collection manager for all game objects |
| `GameObject` | Base class with position, boundaries, and rendering |

## Game Objects

The game supports the following tile types (defined in `ObjectEnum.js`):

- **Brick Walls** (`BW_*`) - Destructible by bullets
- **Concrete Walls** (`CW_*`) - Indestructible
- **Water** (`WATER`) - Obstacle, bullets pass over
- **Grass** (`GRASS`) - Hides tanks, no collision
- **Ice** (`ICE`) - Slippery surface

## Development Notes

### Known TODOs in Code

- `battlecity.js` contains a TODO about understanding how `bind()` works for event handlers

### Coding Style

- Mix of ES5 function declarations and ES6 classes
- Global namespace pollution (many globals in `Globals.js`)
- Hungarian-like notation for some variables (`_posX`, `_prevDirection`)
- Magic numbers used throughout (e.g., `decimation = 16`, sprite size = 32)

### Potential Improvements

1. Modularize code using ES6 modules consistently
2. Add proper state management (menu, playing, game over)
3. Implement enemy AI (currently only player exists)
4. Add collision detection between bullets and walls/tanks
5. Implement game win/lose conditions
6. Add sound effects and music

## Binary Stage Format

Stage files (`.bin`) use a packed format:
- Each byte encodes 2 map tiles (4 bits each)
- Stage dimensions: 14 columns × 13 rows
- Tile values correspond to `MapBlockEnum` constants

## Coordinate System

The game uses a **2D Cartesian coordinate system** with the following conventions:

| Axis | Direction | Increases |
|------|-----------|-----------|
| **X** | Horizontal | → Right |
| **Y** | Vertical | ↓ Down (inverted from standard math) |

### Visual Representation

```
(0,0) ──────────────────────────────────→ X (right)
  │
  │
  │
  ▼
  Y (down)
```

### Canvas Coordinate System

This is the standard HTML5 Canvas coordinate system:

- **Origin (0, 0)**: Top-left corner of the canvas
- **X increases**: Moving right across the screen
- **Y increases**: Moving down the screen (not up like in standard mathematics)

### Game-Specific Coordinates

| Element | Coordinate System |
|---------|-------------------|
| **Canvas** | 1000×1000 pixels (defined in `index.html`) |
| **Stage** | 14×13 tiles (defined in `Globals.js`) |
| **Tile size** | 32×32 pixels (`Globals.SPRITE_SIZE`) |
| **Stage offset** | 1 tile on each side (`Globals.STAGE_W_OFFSET`, `Globals.STAGE_H_OFFSET`) |

### Position Calculations

```javascript
// Object position in pixels (from GameObject.js)
setXYPosition(x, y) {
    this._posX = x + (Globals.STAGE_W_OFFSET * Globals.SPRITE_SIZE);
    this._posY = y + (Globals.STAGE_H_OFFSET * Globals.SPRITE_SIZE);
}

// Example: Place object at tile (2, 3) in stage coordinates
object.setXYPosition(2 * 32, 3 * 32);  // Converts to pixel coordinates
```

### Movement Direction

```javascript
// From Tank.js - movement affects coordinates differently per direction
update() {
    switch(this.direction) {
        case Direction.DOWN:
            this._posY += this.speed * this.dt;  // Y increases (moving down)
            break;
        case Direction.UP:
            this._posY -= this.speed * this.dt;  // Y decreases (moving up)
            break;
        case Direction.LEFT:
            this._posX -= this.speed * this.dt;  // X decreases (moving left)
            break;
        case Direction.RIGHT:
            this._posX += this.speed * this.dt;  // X increases (moving right)
            break;
    }
}
```

### Boundary Calculations

```javascript
// From GameObject.js
getRightBoundary()   { return this._posX + this._width; }   // Right edge
getLeftBoundary()    { return this._posX; }                 // Left edge
getTopBoundary()     { return this._posY; }                 // Top edge (smaller Y)
getBottomBoundary()  { return this._posY + this._height; }  // Bottom edge (larger Y)
```

### Stage Boundaries

```javascript
// Playable area (from Game.js)
Left:   Globals.STAGE_W_OFFSET * Globals.SPRITE_SIZE
Right:  (Globals.STAGE_WIDTH + Globals.STAGE_W_OFFSET) * Globals.SPRITE_SIZE
Top:    Globals.STAGE_H_OFFSET * Globals.SPRITE_SIZE
Bottom: (Globals.STAGE_HEIGHT + Globals.STAGE_H_OFFSET) * Globals.SPRITE_SIZE
```
