// ============================================
// Digital Echoes — "Layer Dive" Game
// A 2D exploration game revealing what's hidden
// beneath the surface of the internet.
// Built with Phaser 3.60
//
// Uses FILTER to manage active enemies and
// collected fragments in the update loop.
// ============================================

// --- Level Definitions ---
// Each level: { name, grid (0=empty,1=wall,2=fragment,3=enemy,4=player,5=portal), bgColor, enemySpeed }
var LEVELS = [
  // Level 1: Surface Web — bright, simple, few enemies
  {
    name: "Surface Web",
    subtitle: "The internet everyone sees...",
    bgColor: 0x0d1117,
    gridColor: 0x21262d,
    playerColor: 0x39ff14,
    fragmentColor: 0x58a6ff,
    enemyColor: 0xff7b42,
    portalColor: 0xbc8cff,
    enemySpeed: 50,
    gridWidth: 20,
    gridHeight: 14,
    // 20 columns x 14 rows grid.  Each cell is 40px. Canvas = 800x560 play area.
    // The grid maps what is on each tile.  0=floor, 1=wall, 2=fragment, 3=enemy spawn, 4=player start, 5=portal
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
  // Level 2: Deep Web — dimmer, more complex, faster enemies
  {
    name: "Deep Web",
    subtitle: "Beneath the surface, the hidden web stirs...",
    bgColor: 0x08080d,
    gridColor: 0x1a1a2e,
    playerColor: 0x39ff14,
    fragmentColor: 0x58a6ff,
    enemyColor: 0xff4757,
    portalColor: 0xbc8cff,
    enemySpeed: 80,
    gridWidth: 22,
    gridHeight: 16,
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
  // Level 3: Dark Web — darkest, most enemies, aggressive AI
  {
    name: "Dark Web",
    subtitle: "The deepest layer. Truth hides in shadow.",
    bgColor: 0x050508,
    gridColor: 0x12121a,
    playerColor: 0x39ff14,
    fragmentColor: 0x58a6ff,
    enemyColor: 0xff1744,
    portalColor: 0xbc8cff,
    enemySpeed: 110,
    gridWidth: 24,
    gridHeight: 17,
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
  }
];

var TILE_SIZE = 32; // pixels per grid cell — max grid 24x17 fits in 800x576

// ============================================
// Boot Scene — Generate all textures procedurally
// ============================================
var BootScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() { Phaser.Scene.call(this, { key: 'BootScene' }); },
  create: function() {
    // Player: glowing cyan circle
    var playerGfx = this.make.graphics({ add: false });
    playerGfx.fillStyle(0x39ff14, 1);
    playerGfx.fillCircle(14, 14, 14);
    playerGfx.fillStyle(0xffffff, 0.3);
    playerGfx.fillCircle(10, 10, 5);
    playerGfx.generateTexture('player', 28, 28);
    playerGfx.destroy();

    // Fragment: blue diamond (truth data)
    var fragGfx = this.make.graphics({ add: false });
    fragGfx.fillStyle(0x58a6ff, 1);
    fragGfx.fillPoints([{x:10,y:0},{x:20,y:10},{x:10,y:20},{x:0,y:10}], true);
    fragGfx.fillStyle(0xffffff, 0.4);
    fragGfx.fillPoints([{x:10,y:3},{x:14,y:10},{x:10,y:17},{x:6,y:10}], true);
    fragGfx.generateTexture('fragment', 20, 20);
    fragGfx.destroy();

    // Enemy: red eye (tracker)
    var enemyGfx = this.make.graphics({ add: false });
    enemyGfx.fillStyle(0xff4757, 1);
    enemyGfx.fillCircle(15, 15, 15);
    enemyGfx.fillStyle(0xffffff, 1);
    enemyGfx.fillCircle(15, 15, 6);
    enemyGfx.fillStyle(0x0a0a0f, 1);
    enemyGfx.fillCircle(15, 15, 3);
    enemyGfx.generateTexture('enemy', 30, 30);
    enemyGfx.destroy();

    // Portal: pulsing purple ring
    var portalGfx = this.make.graphics({ add: false });
    portalGfx.lineStyle(3, 0xbc8cff, 1);
    portalGfx.strokeCircle(15, 15, 13);
    portalGfx.lineStyle(1, 0xbc8cff, 0.5);
    portalGfx.strokeCircle(15, 15, 10);
    portalGfx.generateTexture('portal', 30, 30);
    portalGfx.destroy();

    // Wall tile
    var wallGfx = this.make.graphics({ add: false });
    wallGfx.fillStyle(0x30363d, 1);
    wallGfx.fillRect(1, 1, TILE_SIZE - 2, TILE_SIZE - 2);
    wallGfx.lineStyle(1, 0x21262d, 1);
    wallGfx.strokeRect(1, 1, TILE_SIZE - 2, TILE_SIZE - 2);
    wallGfx.generateTexture('wall', TILE_SIZE, TILE_SIZE);
    wallGfx.destroy();

    // Floor tile (subtle grid)
    var floorGfx = this.make.graphics({ add: false });
    floorGfx.fillStyle(0x161b22, 1);
    floorGfx.fillRect(0, 0, TILE_SIZE, TILE_SIZE);
    floorGfx.lineStyle(1, 0x21262d, 0.3);
    floorGfx.strokeRect(0, 0, TILE_SIZE, TILE_SIZE);
    floorGfx.generateTexture('floor', TILE_SIZE, TILE_SIZE);
    floorGfx.destroy();

    this.scene.start('MenuScene');
  }
});

// ============================================
// Menu Scene — Title and instructions
// ============================================
var MenuScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() { Phaser.Scene.call(this, { key: 'MenuScene' }); },
  create: function() {
    var w = this.cameras.main.width;
    var h = this.cameras.main.height;

    this.cameras.main.setBackgroundColor('#0a0a0f');

    // Title
    this.add.text(w / 2, h / 2 - 140, 'LAYER DIVE', {
      fontFamily: 'monospace', fontSize: '52px', fontWeight: '900',
      color: '#39ff14'
    }).setOrigin(0.5);

    // Subtitle
    this.add.text(w / 2, h / 2 - 80, 'Beneath the Surface of the Internet', {
      fontFamily: 'monospace', fontSize: '16px', color: '#8b949e'
    }).setOrigin(0.5);

    // Story text
    this.add.text(w / 2, h / 2 - 10, [
      'The internet you see is only 4%.',
      '',
      'Dive through three hidden layers.',
      'Collect truth fragments.',
      'Avoid the trackers that hunt you.',
      '',
      'Discover what lies beneath.'
    ].join('\n'), {
      fontFamily: 'monospace', fontSize: '14px', color: '#c9d1d9',
      align: 'center', lineSpacing: 6
    }).setOrigin(0.5);

    // Instructions
    this.add.text(w / 2, h / 2 + 140, '[ ARROW KEYS / WASD ] Move    [ ENTER ] Start', {
      fontFamily: 'monospace', fontSize: '13px', color: '#58a6ff'
    }).setOrigin(0.5);

    // Animated "press enter" blink
    var blink = this.add.text(w / 2, h / 2 + 175, 'PRESS ENTER TO DIVE', {
      fontFamily: 'monospace', fontSize: '18px', color: '#39ff14'
    }).setOrigin(0.5);
    this.tweens.add({ targets: blink, alpha: 0.1, duration: 800, yoyo: true, repeat: -1 });

    // Floating particles
    for (var i = 0; i < 30; i++) {
      var p = this.add.circle(Math.random() * w, Math.random() * h, Math.random() * 2 + 1, 0x39ff14, Math.random() * 0.3 + 0.05);
      this.tweens.add({ targets: p, y: p.y - 100 - Math.random() * 200, alpha: 0, duration: 3000 + Math.random() * 4000, repeat: -1, delay: Math.random() * 2000 });
    }

    // Input — use addKey() (Phaser 3.60 API)
    var enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    enterKey.once('down', function() {
      this.scene.start('GameScene', { level: 0, lives: 3, score: 0 });
    }, this);
    var spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    spaceKey.once('down', function() {
      this.scene.start('GameScene', { level: 0, lives: 3, score: 0 });
    }, this);

    this.add.text(w / 2, h - 40, 'BasisHacks 2026 — Digital Echoes', {
      fontFamily: 'monospace', fontSize: '11px', color: '#30363d'
    }).setOrigin(0.5);
  }
});

// ============================================
// Game Scene — Main gameplay across all levels
// ============================================
var GameScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() { Phaser.Scene.call(this, { key: 'GameScene' }); },

  init: function(data) {
    this.currentLevel = data.level || 0;
    this.lives = data.lives || 3;
    this.score = data.score || 0;
    this.fragmentsCollected = 0;
  },

  create: function() {
    var levelData = LEVELS[this.currentLevel];
    var gw = levelData.gridWidth;
    var gh = levelData.gridHeight;
    var w = gw * TILE_SIZE;
    var h = gh * TILE_SIZE;

    // Adjust camera / game size based on current level
    this.cameras.main.setBackgroundColor(levelData.bgColor);

    // Center offset to draw the grid centered in the canvas
    this.offsetX = (this.cameras.main.width - w) / 2;
    this.offsetY = (this.cameras.main.height - h) / 2;

    // Create groups
    this.walls = this.physics.add.staticGroup();
    this.fragments = this.physics.add.staticGroup();
    this.enemies = this.physics.add.group();
    this.portals = this.physics.add.staticGroup();

    // Parse grid and create objects
    for (var row = 0; row < gh; row++) {
      for (var col = 0; col < gw; col++) {
        var idx = row * gw + col;
        var cell = levelData.grid[idx];
        var x = this.offsetX + col * TILE_SIZE + TILE_SIZE / 2;
        var y = this.offsetY + row * TILE_SIZE + TILE_SIZE / 2;

        if (cell === 1) {
          this.walls.create(x, y, 'wall');
        } else if (cell === 2) {
          var f = this.fragments.create(x, y, 'fragment');
          f.setData('collected', false);
          // Floating animation
          this.tweens.add({ targets: f, y: y - 4, duration: 1200, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
          // Rotation
          this.tweens.add({ targets: f, angle: 360, duration: 3000, repeat: -1 });
        } else if (cell === 3) {
          var enemy = this.enemies.create(x, y, 'enemy');
          enemy.setData('patrolX', x);
          enemy.setData('patrolY', y);
          enemy.setData('patrolDir', Math.random() > 0.5 ? 1 : -1);
          enemy.setData('patrolRange', 60 + Math.random() * 80);
          enemy.setData('patrolAxis', Math.random() > 0.5 ? 'x' : 'y');
          enemy.body.setCollideWorldBounds(true);
        } else if (cell === 4) {
          this.playerStartX = x;
          this.playerStartY = y;
        } else if (cell === 5) {
          this.portal = this.portals.create(x, y, 'portal');
          this.portal.setData('active', false);
          this.portal.setAlpha(0.3);
          this.tweens.add({ targets: this.portal, angle: 360, duration: 2000, repeat: -1 });
        }
      }
    }

    // Also draw floor tiles for visual grid
    // Only draw floor tiles where there is no wall for performance, draw a big floor first
    var bgRect = this.add.rectangle(w / 2 + this.offsetX, h / 2 + this.offsetY, w, h, levelData.bgColor);
    bgRect.setDepth(-1);

    // Create player
    this.player = this.physics.add.sprite(this.playerStartX, this.playerStartY, 'player');
    this.player.setCollideWorldBounds(true);
    this.player.body.setBounds(this.offsetX, this.offsetY, w, h);
    this.player.setDepth(10);

    // Collisions
    this.physics.add.collider(this.player, this.walls);
    this.physics.add.collider(this.enemies, this.walls);
    this.physics.add.overlap(this.player, this.fragments, this.collectFragment, null, this);
    this.physics.add.overlap(this.player, this.portals, this.enterPortal, null, this);
    this.physics.add.overlap(this.player, this.enemies, this.hitEnemy, null, this);

    // Input
    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = {
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    };

    // HUD
    this.createHUD(levelData);

    // Level intro text
    var intro = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, levelData.name + '\n' + levelData.subtitle, {
      fontFamily: 'monospace', fontSize: '24px', color: '#' + levelData.playerColor.toString(16).padStart(6, '0'),
      align: 'center', lineSpacing: 8
    }).setOrigin(0.5).setDepth(100);
    this.tweens.add({ targets: intro, alpha: 0, delay: 2000, duration: 800, onComplete: function() { intro.destroy(); } });

    // Track total fragments for this level
    this.totalFragments = this.fragments.getChildren().length;
  },

  createHUD: function(levelData) {
    var style = { fontFamily: 'monospace', fontSize: '13px', color: '#8b949e' };
    var hudY = 8;

    // HUD background
    var hudBg = this.add.rectangle(this.cameras.main.width / 2, 20, this.cameras.main.width, 45, 0x0a0a0f, 0.85);
    hudBg.setDepth(90);
    hudBg.setScrollFactor(0);

    this.hudText = this.add.text(16, hudY, '', style).setDepth(91).setScrollFactor(0);

    // Lives display
    this.livesIcons = [];
    for (var i = 0; i < this.lives; i++) {
      var icon = this.add.circle(this.cameras.main.width - 30 - i * 22, 22, 7, 0xff4757);
      icon.setDepth(91).setScrollFactor(0);
      this.livesIcons.push(icon);
    }

    this.updateHUD(levelData);
  },

  updateHUD: function(levelData) {
    this.hudText.setText([
      'LAYER: ' + levelData.name.toUpperCase(),
      'FRAGMENTS: ' + this.fragmentsCollected + ' / ' + this.totalFragments,
      'SCORE: ' + this.score
    ].join('    |    '));
  },

  // Collect a truth fragment — FILTER pattern used here
  collectFragment: function(player, fragment) {
    if (fragment.getData('collected')) return;
    fragment.setData('collected', true);

    // Collect animation
    this.tweens.add({ targets: fragment, scaleX: 1.5, scaleY: 1.5, alpha: 0, duration: 300, onComplete: function() { fragment.destroy(); } });

    this.fragmentsCollected++;
    this.score += 100 * (this.currentLevel + 1);

    // Small particle burst
    for (var i = 0; i < 5; i++) {
      var particle = this.add.circle(fragment.x, fragment.y, 3, 0x58a6ff, 0.8);
      this.tweens.add({
        targets: particle,
        x: fragment.x + (Math.random() - 0.5) * 40,
        y: fragment.y + (Math.random() - 0.5) * 40,
        alpha: 0, scaleX: 0, scaleY: 0,
        duration: 400,
        onComplete: function() { particle.destroy(); }
      });
    }

    this.updateHUD(LEVELS[this.currentLevel]);

    // FILTER: Check if all fragments are collected by filtering out destroyed/null ones
    var remainingFragments = this.fragments.getChildren().filter(function(f) {
      return f.active && !f.getData('collected');
    });

    if (remainingFragments.length === 0) {
      this.activatePortal();
    }
  },

  // Activate portal when all fragments collected
  activatePortal: function() {
    this.portal.setAlpha(1);
    this.portal.setData('active', true);
    // Pulsing effect
    this.tweens.add({ targets: this.portal, scaleX: 1.3, scaleY: 1.3, duration: 500, yoyo: true, repeat: -1 });

    // Show message
    var msg = this.add.text(this.cameras.main.width / 2, this.cameras.main.height - 100, 'PORTAL ACTIVATED — Reach it to dive deeper!', {
      fontFamily: 'monospace', fontSize: '14px', color: '#bc8cff'
    }).setOrigin(0.5).setDepth(95);
    this.tweens.add({ targets: msg, alpha: 0, delay: 3000, duration: 500, onComplete: function() { msg.destroy(); } });
  },

  // Enter portal to next level
  enterPortal: function(player, portal) {
    if (!portal.getData('active')) return;

    if (this.currentLevel < LEVELS.length - 1) {
      // Next level
      this.scene.restart({ level: this.currentLevel + 1, lives: this.lives, score: this.score });
    } else {
      // Win!
      this.scene.start('WinScene', { score: this.score, lives: this.lives });
    }
  },

  // Hit by a tracker enemy
  hitEnemy: function(player, enemy) {
    // Brief invulnerability
    if (this.invulnerable) return;
    this.invulnerable = true;

    this.lives--;
    this.score = Math.max(0, this.score - 50);

    // Update lives display
    if (this.livesIcons[this.lives]) {
      this.tweens.add({ targets: this.livesIcons[this.lives], scaleX: 0, scaleY: 0, alpha: 0, duration: 300 });
    }

    // Flash player red
    this.player.setTint(0xff0000);
    this.tweens.add({ targets: this.player, alpha: 0.3, duration: 100, yoyo: true, repeat: 5,
      onComplete: function() {
        this.player.clearTint();
        this.player.setAlpha(1);
        this.invulnerable = false;
      }.bind(this)
    });

    if (this.lives <= 0) {
      this.scene.start('GameOverScene', { score: this.score, level: this.currentLevel, levelName: LEVELS[this.currentLevel].name });
    } else {
      this.updateHUD(LEVELS[this.currentLevel]);
    }
  },

  update: function() {
    if (!this.player || !this.player.active) return;

    // Player movement
    var speed = 180;
    var vx = 0, vy = 0;
    if (this.cursors.left.isDown || this.wasd.left.isDown) vx = -speed;
    if (this.cursors.right.isDown || this.wasd.right.isDown) vx = speed;
    if (this.cursors.up.isDown || this.wasd.up.isDown) vy = -speed;
    if (this.cursors.down.isDown || this.wasd.down.isDown) vy = speed;
    this.player.setVelocity(vx, vy);

    // Normalize diagonal movement
    if (vx !== 0 && vy !== 0) {
      this.player.setVelocity(vx * 0.707, vy * 0.707);
    }

    // Player rotation toward movement direction
    if (vx !== 0 || vy !== 0) {
      this.player.rotation = Math.atan2(vy, vx);
    }

    // Enemy patrol AI — FILTER active enemies, then process each
    var activeEnemies = this.enemies.getChildren().filter(function(e) {
      return e.active;
    });

    activeEnemies.forEach(function(enemy) {
      var ed = enemy.getData('patrolAxis');
      var range = enemy.getData('patrolRange');
      var originX = enemy.getData('patrolX');
      var originY = enemy.getData('patrolY');

      if (ed === 'x') {
        if (enemy.x >= originX + range / 2) enemy.setData('patrolDir', -1);
        if (enemy.x <= originX - range / 2) enemy.setData('patrolDir', 1);
        enemy.setVelocityX(LEVELS[this.currentLevel].enemySpeed * enemy.getData('patrolDir'));
        enemy.setVelocityY(0);
      } else {
        if (enemy.y >= originY + range / 2) enemy.setData('patrolDir', -1);
        if (enemy.y <= originY - range / 2) enemy.setData('patrolDir', 1);
        enemy.setVelocityY(LEVELS[this.currentLevel].enemySpeed * enemy.getData('patrolDir'));
        enemy.setVelocityX(0);
      }
    }, this);

    // Portal glow effect
    if (this.portal && this.portal.getData('active')) {
      this.portal.rotation += 0.02;
    }
  }
});

// ============================================
// Game Over Scene
// ============================================
var GameOverScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() { Phaser.Scene.call(this, { key: 'GameOverScene' }); },
  init: function(data) {
    this.finalScore = data.score || 0;
    this.finalLevel = data.level || 0;
    this.levelName = data.levelName || 'Unknown';
  },
  create: function() {
    var w = this.cameras.main.width;
    var h = this.cameras.main.height;
    this.cameras.main.setBackgroundColor('#0a0a0f');

    this.add.text(w / 2, h / 2 - 100, 'TRACKED', {
      fontFamily: 'monospace', fontSize: '48px', fontWeight: '900', color: '#ff4757'
    }).setOrigin(0.5);

    this.add.text(w / 2, h / 2 - 40, 'Your digital trail was captured.', {
      fontFamily: 'monospace', fontSize: '16px', color: '#8b949e'
    }).setOrigin(0.5);

    this.add.text(w / 2, h / 2 + 20, [
      'Layer reached: ' + this.levelName,
      'Truth fragments: ' + (this.finalScore > 0 ? Math.floor(this.finalScore / 100) : 0),
      'Final Score: ' + this.finalScore
    ].join('\n'), {
      fontFamily: 'monospace', fontSize: '14px', color: '#c9d1d9', align: 'center', lineSpacing: 8
    }).setOrigin(0.5);

    this.add.text(w / 2, h / 2 + 130, 'Even when caught, the truth remains hidden.', {
      fontFamily: 'monospace', fontSize: '13px', color: '#58a6ff'
    }).setOrigin(0.5);

    var blink = this.add.text(w / 2, h / 2 + 180, 'PRESS ENTER TO TRY AGAIN', {
      fontFamily: 'monospace', fontSize: '16px', color: '#39ff14'
    }).setOrigin(0.5);
    this.tweens.add({ targets: blink, alpha: 0.1, duration: 800, yoyo: true, repeat: -1 });

    var enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    enterKey.once('down', function() {
      this.scene.start('GameScene', { level: 0, lives: 3, score: 0 });
    }, this);
  }
});

// ============================================
// Win Scene
// ============================================
var WinScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() { Phaser.Scene.call(this, { key: 'WinScene' }); },
  init: function(data) {
    this.finalScore = data.score || 0;
    this.finalLives = data.lives || 0;
  },
  create: function() {
    var w = this.cameras.main.width;
    var h = this.cameras.main.height;
    this.cameras.main.setBackgroundColor('#0a0a0f');

    this.add.text(w / 2, h / 2 - 100, 'TRUTH REVEALED', {
      fontFamily: 'monospace', fontSize: '44px', fontWeight: '900', color: '#39ff14'
    }).setOrigin(0.5);

    this.add.text(w / 2, h / 2 - 40, 'You pierced through all layers of the digital underground.', {
      fontFamily: 'monospace', fontSize: '14px', color: '#8b949e'
    }).setOrigin(0.5);

    this.add.text(w / 2, h / 2 + 20, [
      'Final Score: ' + this.finalScore,
      'Anonymity remaining: ' + this.finalLives + ' / 3',
      '',
      '"The truth is rarely pure and never simple."',
      '— Oscar Wilde'
    ].join('\n'), {
      fontFamily: 'monospace', fontSize: '14px', color: '#c9d1d9', align: 'center', lineSpacing: 8
    }).setOrigin(0.5);

    this.add.text(w / 2, h / 2 + 150, 'Now you know what lies beneath the surface.', {
      fontFamily: 'monospace', fontSize: '13px', color: '#58a6ff'
    }).setOrigin(0.5);

    var blink = this.add.text(w / 2, h / 2 + 200, 'PRESS ENTER TO PLAY AGAIN', {
      fontFamily: 'monospace', fontSize: '16px', color: '#39ff14'
    }).setOrigin(0.5);
    this.tweens.add({ targets: blink, alpha: 0.1, duration: 800, yoyo: true, repeat: -1 });

    var enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    enterKey.once('down', function() {
      this.scene.start('GameScene', { level: 0, lives: 3, score: 0 });
    }, this);

    // Particle celebration
    for (var i = 0; i < 50; i++) {
      var p = this.add.circle(w / 2, h / 2, 3, Phaser.Math.Between(0, 1) ? 0x39ff14 : 0x58a6ff, 0.8);
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
});

// ============================================
// Phaser Game Configuration
// ============================================
var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 576,
  parent: 'game-container',
  backgroundColor: '#0a0a0f',
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 0 }, debug: false }
  },
  scene: [BootScene, MenuScene, GameScene, GameOverScene, WinScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  render: { pixelArt: false, antialias: true }
};

var game = new Phaser.Game(config);
