// ============================================
// Digital Echoes — "Layer Dive" Game
// Phaser 3.60 — ES6 Class Syntax
//
// A 2D top-down game where the player dives
// through 6 hidden layers of the internet,
// collecting truth fragments while dodging
// trackers that chase the player.
//
// Grid legend for level definitions:
//   0 = floor   1 = wall     2 = fragment
//   3 = enemy   4 = player   5 = portal
// ============================================

// Tile size in pixels — all grid math derives from this
var TILE_SIZE = 32;

// ============================================
// DOM Keyboard Fallback (for Mac Browsers)
//
// Phaser's keyboard plugin sometimes fails to
// capture input on macOS (Safari, Chrome).
// These DOM-level listeners act as a fallback
// so the game is playable on any platform.
// ============================================
var domKeys = { up: false, down: false, left: false, right: false, enter: false, space: false };
var domEnterJustPressed = false;
var domSpaceJustPressed = false;

document.addEventListener('keydown', function(e) {
  switch(e.key) {
    case 'ArrowUp': case 'w': case 'W': domKeys.up = true; e.preventDefault(); break;
    case 'ArrowDown': case 's': case 'S': domKeys.down = true; e.preventDefault(); break;
    case 'ArrowLeft': case 'a': case 'A': domKeys.left = true; e.preventDefault(); break;
    case 'ArrowRight': case 'd': case 'D': domKeys.right = true; e.preventDefault(); break;
    case 'Enter': domKeys.enter = true; domEnterJustPressed = true; e.preventDefault(); break;
    case ' ': domKeys.space = true; domSpaceJustPressed = true; e.preventDefault(); break;
  }
});

document.addEventListener('keyup', function(e) {
  switch(e.key) {
    case 'ArrowUp': case 'w': case 'W': domKeys.up = false; break;
    case 'ArrowDown': case 's': case 'S': domKeys.down = false; break;
    case 'ArrowLeft': case 'a': case 'A': domKeys.left = false; break;
    case 'ArrowRight': case 'd': case 'D': domKeys.right = false; break;
    case 'Enter': domKeys.enter = false; break;
    case ' ': domKeys.space = false; break;
  }
});

// ============================================
// Level Definitions (6 layers, escalating difficulty)
//
// Each level has:
//   - name / subtitle shown on entry
//   - bgColor (gets darker as you descend)
//   - enemySpeed (increases per level)
//   - gridWidth / gridHeight in tiles
//   - 2D grid flattened to a 1D array
// ============================================
var LEVELS = [
  // ---- Level 1: Surface Web ----
  {
    name: "Surface Web", subtitle: "The internet everyone sees...",
    bgColor: 0x0d1117, playerColor: '#39ff14', enemyColor: 0xff7b42,
    enemySpeed: 50, gridWidth: 20, gridHeight: 14,
    grid: [
      1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
      1,4,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,5,1,
      1,0,1,0,1,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,
      1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,2,0,0,1,
      1,0,1,1,0,0,1,1,0,1,0,1,0,1,1,0,1,0,1,1,
      1,0,0,0,0,0,0,2,0,0,0,0,0,2,0,0,0,0,0,1,
      1,1,1,0,1,1,0,1,1,0,1,1,0,1,0,1,0,1,0,1,
      1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
      1,0,1,1,0,1,1,1,0,0,0,1,1,0,1,1,0,1,1,1,
      1,0,0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,0,1,
      1,0,1,0,1,1,0,1,0,1,0,0,1,0,1,1,0,1,0,1,
      1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,2,0,0,3,1,
      1,0,1,0,0,0,1,1,0,1,1,0,1,1,0,1,0,1,0,1,
      1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ]
  },
  // ---- Level 2: Deep Web ----
  {
    name: "Deep Web", subtitle: "Beneath the surface, the hidden web stirs...",
    bgColor: 0x08080d, playerColor: '#39ff14', enemyColor: 0xff4757,
    enemySpeed: 80, gridWidth: 22, gridHeight: 16,
    grid: [
      1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
      1,4,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,
      1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,1,0,1,0,1,
      1,0,0,0,0,0,1,2,0,0,0,0,0,0,0,0,0,1,0,0,0,1,
      1,1,1,0,1,1,1,0,1,0,1,1,0,1,1,0,1,1,0,1,1,1,
      1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
      1,0,1,1,1,0,1,1,0,1,0,1,1,0,1,1,0,1,1,1,0,1,
      1,0,0,0,0,0,1,2,0,0,0,0,2,0,0,0,0,0,0,0,3,1,
      1,0,1,0,1,1,1,0,1,1,0,1,0,1,1,0,1,0,1,0,1,1,
      1,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,1,
      1,0,1,1,0,1,0,1,0,1,1,0,1,1,0,1,0,1,0,1,0,1,
      1,3,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,
      1,0,1,0,1,0,1,1,0,1,0,1,0,1,1,0,1,1,0,1,0,1,
      1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,1,
      1,0,1,1,1,0,1,0,1,1,1,0,1,1,0,1,0,1,1,0,3,1,
      1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ]
  },
  // ---- Level 3: Dark Web ----
  {
    name: "Dark Web", subtitle: "The deepest layer. Truth hides in shadow.",
    bgColor: 0x050508, playerColor: '#39ff14', enemyColor: 0xff1744,
    enemySpeed: 110, gridWidth: 24, gridHeight: 17,
    grid: [
      1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
      1,4,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,
      1,0,1,1,0,1,0,1,1,1,0,0,1,0,1,0,1,1,0,1,0,1,0,1,
      1,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,
      1,1,1,1,0,1,1,0,1,0,1,1,0,1,1,0,1,1,0,1,1,1,0,1,
      1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
      1,0,1,0,1,1,0,1,0,1,0,1,1,0,1,1,0,1,1,0,1,0,1,1,
      1,0,0,0,1,2,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,3,1,
      1,1,1,0,1,0,1,1,0,1,1,0,1,0,1,1,0,1,1,0,1,0,1,1,
      1,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,1,
      1,0,1,1,1,0,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,0,1,1,
      1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,1,
      1,0,1,0,1,1,1,0,1,0,1,0,1,1,0,1,0,1,1,0,1,0,1,1,
      1,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,1,
      1,1,1,0,1,0,1,1,0,0,1,1,0,1,1,0,1,0,0,1,0,1,0,1,
      1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,
      1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ]
  },
  // ---- Level 4: Surveillance Grid (dense walls, many trackers) ----
  {
    name: "Surveillance Grid",
    subtitle: "They are watching from every corner...",
    bgColor: 0x040408, playerColor: '#39ff14', enemyColor: 0xff2255,
    enemySpeed: 130, gridWidth: 24, gridHeight: 17,
    grid: [
      1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
      1,4,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,
      1,0,0,1,0,1,0,1,0,1,1,1,0,0,0,1,0,1,0,1,1,0,1,1,
      1,1,0,0,0,1,0,0,0,1,2,0,0,1,0,1,0,0,0,1,0,0,0,1,
      1,3,0,1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,
      1,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,1,0,1,
      1,0,1,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,0,0,0,1,
      1,0,0,0,0,1,0,0,0,0,0,2,0,0,0,0,0,1,0,0,0,1,3,1,
      1,1,1,0,1,1,0,1,1,1,0,1,1,0,1,1,0,1,1,1,0,1,0,1,
      1,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0,0,0,1,
      1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,1,0,1,1,1,0,1,
      1,0,1,0,0,0,0,0,0,0,0,2,0,0,0,0,1,0,0,0,0,1,0,1,
      1,3,1,1,1,0,1,1,0,1,1,1,0,1,1,1,0,1,1,0,1,1,0,1,
      1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,5,1,
      1,0,1,1,1,1,1,0,1,1,1,0,1,1,0,1,1,1,0,1,1,0,3,1,
      1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
      1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ]
  },
  // ---- Level 5: Data Fortress (heavy walls, elite enemies) ----
  {
    name: "Data Fortress",
    subtitle: "The truth is locked behind walls of code...",
    bgColor: 0x030306, playerColor: '#39ff14', enemyColor: 0xff0044,
    enemySpeed: 155, gridWidth: 24, gridHeight: 17,
    grid: [
      1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
      1,4,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,1,
      1,1,1,0,1,1,0,1,1,1,0,1,0,1,1,0,1,0,1,1,1,1,0,1,
      1,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,2,0,0,1,
      1,0,1,1,1,0,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,0,1,1,
      1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,
      1,1,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,0,1,1,1,1,0,1,
      1,3,0,0,0,1,0,0,0,0,0,0,0,2,0,0,0,0,0,1,0,0,3,1,
      1,0,1,1,0,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,0,1,
      1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,1,
      1,1,0,1,1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,
      1,0,0,1,0,0,0,0,0,1,0,0,2,0,0,1,0,0,0,0,0,0,0,1,
      1,0,1,1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,0,1,1,
      1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,5,1,
      1,0,1,1,1,1,0,1,1,0,1,1,0,1,1,1,0,1,1,0,0,1,3,1,
      1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
      1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ]
  },
  // ---- Level 6: The Source (final, hardest) ----
  {
    name: "The Source",
    subtitle: "At the core, the raw truth awaits...",
    bgColor: 0x020204, playerColor: '#39ff14', enemyColor: 0xff0030,
    enemySpeed: 175, gridWidth: 24, gridHeight: 17,
    grid: [
      1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
      1,4,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1,
      1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,0,1,1,0,1,
      1,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,2,0,0,1,0,0,1,
      1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,1,0,1,1,
      1,3,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,
      1,0,1,1,1,0,1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,0,1,
      1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,2,0,0,3,1,
      1,1,1,0,1,1,1,0,1,1,1,1,0,1,1,1,0,1,1,1,1,0,1,1,
      1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,
      1,0,1,1,1,0,1,1,1,0,1,1,1,1,0,1,1,1,0,1,0,1,0,1,
      1,0,0,0,0,0,0,0,1,0,0,0,2,0,0,0,0,1,0,0,0,1,3,1,
      1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,1,0,1,0,1,0,1,0,1,
      1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,5,1,
      1,0,1,1,1,0,1,1,0,1,1,0,1,1,1,0,1,1,1,1,0,1,3,1,
      1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
      1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ]
  }
];

// ============================================
// BootScene
//
// Runs once at startup. Generates all sprite
// textures programmatically using Phaser's
// Graphics object — no external image files.
// ============================================
class BootScene extends Phaser.Scene {
  constructor() { super('BootScene'); }

  create() {
    // --- Player: green circle with white highlight ---
    var pg = this.make.graphics({ add: false });
    pg.fillStyle(0x39ff14, 1);
    pg.fillCircle(7, 7, 7);               // main green body
    pg.fillStyle(0xffffff, 0.3);
    pg.fillCircle(5, 5, 2);               // small highlight (top-left)
    pg.generateTexture('player', 14, 14);
    pg.destroy();

    // --- Fragment: blue diamond (truth crystal) ---
    var fg = this.make.graphics({ add: false });
    fg.fillStyle(0x58a6ff, 1);
    fg.fillPoints([{x:10,y:0},{x:20,y:10},{x:10,y:20},{x:0,y:10}], true);
    fg.fillStyle(0xffffff, 0.4);
    fg.fillPoints([{x:10,y:3},{x:14,y:10},{x:10,y:17},{x:6,y:10}], true);
    fg.generateTexture('fragment', 20, 20);
    fg.destroy();

    // --- Enemy: red eye (tracker) — white sclera, dark pupil ---
    var eg = this.make.graphics({ add: false });
    eg.fillStyle(0xff4757, 1);
    eg.fillCircle(15, 15, 15);            // outer red
    eg.fillStyle(0xffffff, 1);
    eg.fillCircle(15, 15, 6);             // white "sclera"
    eg.fillStyle(0x0a0a0f, 1);
    eg.fillCircle(15, 15, 3);             // dark "pupil"
    eg.generateTexture('enemy', 30, 30);
    eg.destroy();

    // --- Portal: purple ring (exit to next layer) ---
    var ptg = this.make.graphics({ add: false });
    ptg.lineStyle(3, 0xbc8cff, 1);
    ptg.strokeCircle(15, 15, 13);         // outer ring
    ptg.lineStyle(1, 0xbc8cff, 0.5);
    ptg.strokeCircle(15, 15, 10);         // inner ring (subtle)
    ptg.generateTexture('portal', 30, 30);
    ptg.destroy();

    // --- Wall: dark block with subtle border ---
    var wg = this.make.graphics({ add: false });
    wg.fillStyle(0x30363d, 1);
    wg.fillRect(1, 1, TILE_SIZE - 2, TILE_SIZE - 2);
    wg.lineStyle(1, 0x21262d, 1);
    wg.strokeRect(1, 1, TILE_SIZE - 2, TILE_SIZE - 2);
    wg.generateTexture('wall', TILE_SIZE, TILE_SIZE);
    wg.destroy();

    // Textures ready — proceed to menu
    this.scene.start('MenuScene');
  }
}

// ============================================
// MenuScene
//
// Title screen with story text and floating
// green particles. Start via click or Enter.
// ============================================
class MenuScene extends Phaser.Scene {
  constructor() { super('MenuScene'); }

  create() {
    var w = this.cameras.main.width;
    var h = this.cameras.main.height;
    this.cameras.main.setBackgroundColor('#0a0a0f');

    // Title
    this.add.text(w / 2, h / 2 - 150, 'LAYER DIVE', {
      fontFamily: 'monospace', fontSize: '52px', fontWeight: '900', color: '#39ff14'
    }).setOrigin(0.5);

    // Subtitle
    this.add.text(w / 2, h / 2 - 90, 'Beneath the Surface of the Internet', {
      fontFamily: 'monospace', fontSize: '16px', color: '#8b949e'
    }).setOrigin(0.5);

    // Story blurb
    this.add.text(w / 2, h / 2 - 10, [
      'The internet you see is only 4%.',
      '', 'Dive through three hidden layers.',
      'Collect truth fragments. Avoid the trackers.',
      '', 'Discover what lies beneath.'
    ].join('\n'), {
      fontFamily: 'monospace', fontSize: '14px', color: '#c9d1d9',
      align: 'center', lineSpacing: 6
    }).setOrigin(0.5);

    // Controls hint
    this.add.text(w / 2, h / 2 + 130, 'ARROW KEYS / WASD to move', {
      fontFamily: 'monospace', fontSize: '13px', color: '#58a6ff'
    }).setOrigin(0.5);

    // --- Clickable start button (also keyboard-activated in update()) ---
    var startZone = this.add.rectangle(w / 2, h / 2 + 185, 340, 50, 0x0d2810, 0.8)
      .setInteractive({ useHandCursor: true })
      .setStrokeStyle(2, 0x39ff14);

    var startText = this.add.text(w / 2, h / 2 + 185, 'CLICK OR PRESS ENTER TO DIVE', {
      fontFamily: 'monospace', fontSize: '16px', color: '#39ff14'
    }).setOrigin(0.5);

    // Pulsing fade on the start button
    this.tweens.add({
      targets: [startZone, startText], alpha: 0.3,
      duration: 600, yoyo: true, repeat: -1
    });

    // Hover effects
    startZone.on('pointerover', function() {
      startZone.setFillStyle(0x1a3a1a, 0.9);
      startText.setColor('#ffffff');
    });
    startZone.on('pointerout', function() {
      startZone.setFillStyle(0x0d2810, 0.8);
      startText.setColor('#39ff14');
    });
    startZone.on('pointerdown', function() {
      this.scene.start('GameScene', { level: 0, lives: 3, score: 0 });
    }, this);

    // Keyboard input (Phaser + DOM fallback checked in update())
    this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // --- Ambient floating particles (green) ---
    for (var i = 0; i < 20; i++) {
      var p = this.add.circle(
        Math.random() * w, Math.random() * h,
        Math.random() * 2 + 1, 0x39ff14, Math.random() * 0.3 + 0.05
      );
      this.tweens.add({
        targets: p, y: p.y - 100 - Math.random() * 200, alpha: 0,
        duration: 3000 + Math.random() * 4000,
        repeat: -1,
        delay: Math.random() * 2000
      });
    }

    // Footer credit
    this.add.text(w / 2, h - 40, 'BasisHacks 2026 — Digital Echoes', {
      fontFamily: 'monospace', fontSize: '11px', color: '#30363d'
    }).setOrigin(0.5);
  }

  // Check every frame for Enter/Space — uses both Phaser and DOM
  update() {
    if (Phaser.Input.Keyboard.JustDown(this.enterKey) ||
        Phaser.Input.Keyboard.JustDown(this.spaceKey) ||
        domEnterJustPressed || domSpaceJustPressed) {
      domEnterJustPressed = false;
      domSpaceJustPressed = false;
      this.scene.start('GameScene', { level: 0, lives: 3, score: 0 });
    }
  }
}

// ============================================
// GameScene
//
// Main gameplay loop. Builds the level from
// the grid array, spawns entities, runs
// chase AI, handles collisions.
// ============================================
class GameScene extends Phaser.Scene {
  constructor() { super('GameScene'); }

  // Called each time the scene starts/restarts
  init(data) {
    this.currentLevel = data.level || 0;
    this.lives = data.lives || 3;
    this.score = data.score || 0;
    this.fragmentsCollected = 0;
    this.invulnerable = false; // brief immunity after being hit
  }

  create() {
    var lv = LEVELS[this.currentLevel];
    var gw = lv.gridWidth, gh = lv.gridHeight;
    var worldW = gw * TILE_SIZE, worldH = gh * TILE_SIZE;

    // Center the world in the camera view
    var ox = (this.cameras.main.width - worldW) / 2;
    var oy = (this.cameras.main.height - worldH) / 2;

    this.cameras.main.setBackgroundColor(lv.bgColor);

    // Physics groups for collision management
    this.walls = this.physics.add.staticGroup();
    this.fragments = this.physics.add.staticGroup();
    this.enemies = this.physics.add.group();
    this.portals = this.physics.add.staticGroup();

    // === Parse the grid and spawn entities ===
    for (var row = 0; row < gh; row++) {
      for (var col = 0; col < gw; col++) {
        var cell = lv.grid[row * gw + col];
        var x = ox + col * TILE_SIZE + TILE_SIZE / 2;
        var y = oy + row * TILE_SIZE + TILE_SIZE / 2;

        if (cell === 1) {
          // Wall tile
          this.walls.create(x, y, 'wall');
        } else if (cell === 2) {
          // Fragment (collectible) — floats and rotates
          var f = this.fragments.create(x, y, 'fragment');
          f.setData('collected', false);
          this.tweens.add({
            targets: f, y: y - 4, duration: 1200, yoyo: true, repeat: -1
          });
          this.tweens.add({
            targets: f, angle: 360, duration: 3000, repeat: -1
          });
        } else if (cell === 3) {
          // Enemy (tracker) — starts with patrol data, but chase AI overrides
          var en = this.enemies.create(x, y, 'enemy');
          en.setData('patrolX', x);
          en.setData('patrolY', y);
          en.body.setCollideWorldBounds(true);
        } else if (cell === 4) {
          // Player spawn point
          this.playerStartX = x;
          this.playerStartY = y;
        } else if (cell === 5) {
          // Portal (exit) — starts dim, lights up when all fragments collected
          this.portal = this.portals.create(x, y, 'portal');
          this.portal.setData('active', false);
          this.portal.setAlpha(0.3);
          this.tweens.add({
            targets: this.portal, angle: 360, duration: 2000, repeat: -1
          });
        }
      }
    }

    // Create player sprite at spawn position
    this.player = this.physics.add.sprite(this.playerStartX, this.playerStartY, 'player');
    this.player.setCollideWorldBounds(true);
    this.physics.world.setBounds(ox, oy, worldW, worldH);
    this.player.setDepth(10); // render above walls/enemies

    // === Collision setup ===
    // player vs walls — solid, blocks movement
    this.physics.add.collider(this.player, this.walls);
    // enemies vs walls — enemies also blocked by walls
    this.physics.add.collider(this.enemies, this.walls);
    // player vs fragments — collects on touch (no pushback)
    this.physics.add.overlap(this.player, this.fragments, this.collectFragment, null, this);
    // player vs portals — enters if portal is active
    this.physics.add.overlap(this.player, this.portals, this.enterPortal, null, this);
    // player vs enemies — takes damage (with invulnerability window)
    this.physics.add.overlap(this.player, this.enemies, this.hitEnemy, null, this);

    // === Input: both Phaser keys and DOM fallback (Mac) ===
    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = {
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    };

    // Heads-Up Display (layer name, fragments, score, lives)
    this.totalFragments = this.fragments.getChildren().length;
    this.createHUD(lv);

    // === Level intro text — fades out after 2 seconds ===
    var intro = this.add.text(400, 288, lv.name + '\n' + lv.subtitle, {
      fontFamily: 'monospace', fontSize: '24px',
      color: lv.playerColor, align: 'center'
    }).setOrigin(0.5).setDepth(100);
    this.tweens.add({
      targets: intro, alpha: 0, delay: 2000, duration: 800,
      onComplete: function() { intro.destroy(); }
    });
  }

  // Create the bar across the top showing game state
  createHUD(lv) {
    // Semi-transparent background bar
    var bg = this.add.rectangle(400, 22, 800, 48, 0x0a0a0f, 0.85).setDepth(90);

    // Text showing layer / fragments / score
    this.hudText = this.add.text(16, 10, '', {
      fontFamily: 'monospace', fontSize: '13px', color: '#8b949e'
    }).setDepth(91);

    // Red circle icons showing remaining lives (top-right)
    this.livesIcons = [];
    for (var i = 0; i < this.lives; i++) {
      var icon = this.add.circle(770 - i * 24, 22, 7, 0xff4757).setDepth(91);
      this.livesIcons.push(icon);
    }
    this.updateHUD(lv);
  }

  // Refresh the HUD text each time state changes
  updateHUD(lv) {
    this.hudText.setText([
      'LAYER: ' + lv.name.toUpperCase(),
      'FRAGMENTS: ' + this.fragmentsCollected + '/' + this.totalFragments,
      'SCORE: ' + this.score
    ].join('    |    '));
  }

  // Called when player overlaps a fragment
  collectFragment(player, fragment) {
    if (fragment.getData('collected')) return; // already picked up
    fragment.setData('collected', true);

    // Scale up and fade out
    this.tweens.add({
      targets: fragment, scaleX: 1.5, scaleY: 1.5, alpha: 0, duration: 300,
      onComplete: function() { fragment.destroy(); }
    });

    this.fragmentsCollected++;
    // Higher levels give more points
    this.score += 100 * (this.currentLevel + 1);

    // Burst of small particles on collection
    for (var i = 0; i < 5; i++) {
      var p = this.add.circle(fragment.x, fragment.y, 3, 0x58a6ff, 0.8);
      this.tweens.add({
        targets: p,
        x: fragment.x + (Math.random() - 0.5) * 40,
        y: fragment.y + (Math.random() - 0.5) * 40,
        alpha: 0, scaleX: 0, scaleY: 0, duration: 400,
        onComplete: function() { p.destroy(); }
      });
    }

    this.updateHUD(LEVELS[this.currentLevel]);

    // FILTER pattern: check if any fragments remain uncollected
    var remaining = this.fragments.getChildren().filter(function(f) {
      return f.active && !f.getData('collected');
    });

    if (remaining.length === 0) {
      this.activatePortal(); // all done — open the exit
    }
  }

  // Portal lights up and starts pulsing
  activatePortal() {
    this.portal.setAlpha(1);
    this.portal.setData('active', true);
    this.tweens.add({
      targets: this.portal, scaleX: 1.3, scaleY: 1.3,
      duration: 500, yoyo: true, repeat: -1
    });

    // Temporary instruction text
    var msg = this.add.text(400, this.cameras.main.height - 60,
      'PORTAL ACTIVATED — Reach it to dive deeper!', {
      fontFamily: 'monospace', fontSize: '14px', color: '#bc8cff'
    }).setOrigin(0.5).setDepth(95);
    this.tweens.add({
      targets: msg, alpha: 0, delay: 3000, duration: 500,
      onComplete: function() { msg.destroy(); }
    });
  }

  // Player stepped on an active portal → next level or win
  enterPortal(player, portal) {
    if (!portal.getData('active')) return; // not ready yet
    if (this.currentLevel < LEVELS.length - 1) {
      // Advance to next level, carrying score and lives
      this.scene.restart({
        level: this.currentLevel + 1,
        lives: this.lives,
        score: this.score
      });
    } else {
      // Beat the final level
      this.scene.start('WinScene', {
        score: this.score, lives: this.lives
      });
    }
  }

  // Player collided with an enemy
  hitEnemy(player, enemy) {
    if (this.invulnerable) return; // brief immunity prevents multi-hit
    this.invulnerable = true;
    this.lives--;
    this.score = Math.max(0, this.score - 50); // penalty, can't go below 0

    // Animate one life icon disappearing
    if (this.livesIcons[this.lives]) {
      this.tweens.add({
        targets: this.livesIcons[this.lives],
        scaleX: 0, scaleY: 0, alpha: 0, duration: 300
      });
    }

    // Flash red and flicker to show damage
    this.player.setTint(0xff0000);
    this.tweens.add({
      targets: this.player, alpha: 0.3,
      duration: 100, yoyo: true, repeat: 5,
      onComplete: function() {
        this.player.clearTint();
        this.player.setAlpha(1);
        this.invulnerable = false; // immunity wears off
      }.bind(this)
    });

    if (this.lives <= 0) {
      this.scene.start('GameOverScene', {
        score: this.score, level: this.currentLevel,
        levelName: LEVELS[this.currentLevel].name
      });
    } else {
      this.updateHUD(LEVELS[this.currentLevel]);
    }
  }

  // Main game loop — called every frame (~60fps)
  update() {
    if (!this.player || !this.player.active) return;

    // === Player Movement ===
    // Speed = 180 px/s. Diagonal movement normalized by 0.707 (≈ 1/√2)
    // so diagonal isn't faster than cardinal.
    var speed = 180, vx = 0, vy = 0;
    if (this.cursors.left.isDown || this.wasd.left.isDown || domKeys.left)   vx = -speed;
    if (this.cursors.right.isDown || this.wasd.right.isDown || domKeys.right) vx = speed;
    if (this.cursors.up.isDown || this.wasd.up.isDown || domKeys.up)         vy = -speed;
    if (this.cursors.down.isDown || this.wasd.down.isDown || domKeys.down)   vy = speed;

    if (vx !== 0 && vy !== 0) { vx *= 0.707; vy *= 0.707; } // normalize diagonal
    this.player.setVelocity(vx, vy);

    // Rotate player to face movement direction
    if (vx !== 0 || vy !== 0) this.player.rotation = Math.atan2(vy, vx);

    // === Chase AI ===
    // Each active enemy calculates a vector toward the player
    // and moves along it at the level's enemySpeed.
    var self = this;
    var playerX = this.player.x, playerY = this.player.y;
    this.enemies.getChildren().filter(function(e) { return e.active; }).forEach(function(en) {
      var dx = playerX - en.x;
      var dy = playerY - en.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 0) {
        var espeed = LEVELS[self.currentLevel].enemySpeed;
        en.setVelocityX((dx / dist) * espeed);
        en.setVelocityY((dy / dist) * espeed);
      }
    });

    // Spin the portal continuously if it's active
    if (this.portal && this.portal.getData('active')) {
      this.portal.rotation += 0.02;
    }
  }
}

// ============================================
// GameOverScene
//
// Shown when lives reach 0. Shows stats and
// a clickable/keyboard retry button.
// ============================================
class GameOverScene extends Phaser.Scene {
  constructor() { super('GameOverScene'); }

  init(data) {
    this.finalScore = data.score || 0;
    this.finalLevel = data.level || 0;
    this.levelName = data.levelName || 'Unknown';
  }

  create() {
    var w = this.cameras.main.width, h = this.cameras.main.height;
    this.cameras.main.setBackgroundColor('#0a0a0f');

    // "TRACKED" — the trackers caught you
    this.add.text(w / 2, h / 2 - 100, 'TRACKED', {
      fontFamily: 'monospace', fontSize: '48px', fontWeight: '900', color: '#ff4757'
    }).setOrigin(0.5);

    this.add.text(w / 2, h / 2 - 40, 'Your digital trail was captured.', {
      fontFamily: 'monospace', fontSize: '16px', color: '#8b949e'
    }).setOrigin(0.5);

    // Stats
    this.add.text(w / 2, h / 2 + 20, [
      'Layer reached: ' + this.levelName,
      'Score: ' + this.finalScore
    ].join('\n'), {
      fontFamily: 'monospace', fontSize: '14px', color: '#c9d1d9',
      align: 'center', lineSpacing: 8
    }).setOrigin(0.5);

    // Retry button (clickable rectangle)
    var zone = this.add.rectangle(w / 2, h / 2 + 150, 350, 45, 0x280d0d, 0.8)
      .setInteractive({ useHandCursor: true }).setStrokeStyle(2, 0xff4757);
    var zoneText = this.add.text(w / 2, h / 2 + 150, 'CLICK OR PRESS ENTER TO RETRY', {
      fontFamily: 'monospace', fontSize: '15px', color: '#ff4757'
    }).setOrigin(0.5);

    this.tweens.add({
      targets: [zone, zoneText], alpha: 0.3,
      duration: 600, yoyo: true, repeat: -1
    });

    zone.on('pointerover', function() {
      zone.setFillStyle(0x3a1a1a, 0.9); zoneText.setColor('#ffffff');
    });
    zone.on('pointerout', function() {
      zone.setFillStyle(0x280d0d, 0.8); zoneText.setColor('#ff4757');
    });
    zone.on('pointerdown', function() {
      this.scene.start('GameScene', { level: 0, lives: 3, score: 0 });
    }, this);

    this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.enterKey) || domEnterJustPressed) {
      domEnterJustPressed = false;
      this.scene.start('GameScene', { level: 0, lives: 3, score: 0 });
    }
  }
}

// ============================================
// WinScene
//
// Shown after completing all 6 levels.
// Celebration particles + replay option.
// ============================================
class WinScene extends Phaser.Scene {
  constructor() { super('WinScene'); }

  init(data) {
    this.finalScore = data.score || 0;
    this.finalLives = data.lives || 0;
  }

  create() {
    var w = this.cameras.main.width, h = this.cameras.main.height;
    this.cameras.main.setBackgroundColor('#0a0a0f');

    this.add.text(w / 2, h / 2 - 110, 'TRUTH REVEALED', {
      fontFamily: 'monospace', fontSize: '44px', fontWeight: '900', color: '#39ff14'
    }).setOrigin(0.5);

    this.add.text(w / 2, h / 2 - 50, 'You pierced through all layers.', {
      fontFamily: 'monospace', fontSize: '14px', color: '#8b949e'
    }).setOrigin(0.5);

    // Final stats
    this.add.text(w / 2, h / 2 + 10, [
      'Score: ' + this.finalScore,
      'Anonymity: ' + this.finalLives + '/3'
    ].join('\n'), {
      fontFamily: 'monospace', fontSize: '14px', color: '#c9d1d9',
      align: 'center', lineSpacing: 8
    }).setOrigin(0.5);

    // Replay button
    var zone = this.add.rectangle(w / 2, h / 2 + 140, 350, 45, 0x0d2810, 0.8)
      .setInteractive({ useHandCursor: true }).setStrokeStyle(2, 0x39ff14);
    var zoneText = this.add.text(w / 2, h / 2 + 140, 'CLICK OR PRESS ENTER TO PLAY AGAIN', {
      fontFamily: 'monospace', fontSize: '15px', color: '#39ff14'
    }).setOrigin(0.5);

    this.tweens.add({
      targets: [zone, zoneText], alpha: 0.3,
      duration: 600, yoyo: true, repeat: -1
    });

    zone.on('pointerover', function() {
      zone.setFillStyle(0x1a3a1a, 0.9); zoneText.setColor('#ffffff');
    });
    zone.on('pointerout', function() {
      zone.setFillStyle(0x0d2810, 0.8); zoneText.setColor('#39ff14');
    });
    zone.on('pointerdown', function() {
      this.scene.start('GameScene', { level: 0, lives: 3, score: 0 });
    }, this);

    this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    // === Celebration: 40 particles burst outward ===
    for (var i = 0; i < 40; i++) {
      var p = this.add.circle(w / 2, h / 2, 3,
        Math.random() > 0.5 ? 0x39ff14 : 0x58a6ff, 0.8);
      this.tweens.add({
        targets: p,
        x: w / 2 + (Math.random() - 0.5) * 400,
        y: h / 2 + (Math.random() - 0.5) * 300,
        alpha: 0, scaleX: 0, scaleY: 0,
        duration: 2000 + Math.random() * 1000,
        delay: Math.random() * 500
      });
    }
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.enterKey) || domEnterJustPressed) {
      domEnterJustPressed = false;
      this.scene.start('GameScene', { level: 0, lives: 3, score: 0 });
    }
  }
}

// ============================================
// Phaser Config & Launch
//
// Arcade physics (no gravity — top-down).
// Scale.FIT + CENTER_BOTH = responsive sizing.
// scene list defines loading/shutdown order.
// ============================================
var config = {
  type: Phaser.AUTO,             // WebGL preferred, Canvas fallback
  width: 800,
  height: 576,
  parent: 'game-container',      // injects into this DOM element
  backgroundColor: '#0a0a0f',
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 0 }, debug: false }
  },
  scene: [BootScene, MenuScene, GameScene, GameOverScene, WinScene],
  scale: {
    mode: Phaser.Scale.FIT,        // scale to fit container
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  render: { pixelArt: false, antialias: true }
};

var game = new Phaser.Game(config);
