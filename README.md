# Digital Echoes — BasisHacks 2026

**Theme: Beneath the Surface**

> *"The internet you see is only 4%. Discover what lies beneath."*

---

## Project Description

Every day, the average person generates over 2,500 data points through routine online activity — searches, social media, streaming, shopping, navigation. Behind the clean interfaces of the web, a hidden ecosystem of over 6,000 data brokers and trackers collects, packages, and sells this information without most people ever knowing.

**Digital Echoes** is an interactive experience that reveals the hidden reality of digital privacy. Through three connected layers — a website, an app, and a game — users journey from the familiar "surface" of the internet down into its hidden depths, discovering what truly lies beneath their everyday digital lives.

### The Problem

- 81% of people are concerned about data privacy, yet most don't understand what data is collected about them
- The average website embeds 20+ hidden third-party trackers
- Data brokers collectively hold profiles on billions of people — most have never heard of them
- Over 353 major data breaches exposed billions of records in 2024 alone

### Our Solution

Digital Echoes makes the invisible visible. It transforms abstract privacy concepts into an interactive, data-driven experience that lets users:

1. **See** their hidden data trail through real statistics and visualizations
2. **Understand** who collects their data and how it's monetized
3. **Act** with a practical privacy checklist and protection tips
4. **Explore** through a game that metaphorically represents diving beneath the internet's surface

---

## The Three Layers

### Surface — Landing Page ([index.html](index.html))

The entry point. A clean, modern website that looks normal at first glance — but subtle glitch animations, scanning lines, and visual "cracks" hint that something lies beneath. Animated counters reveal shocking statistics (2,500 data points per day, 6,000+ trackers). A "Dive Deeper" call-to-action invites users to dig below the surface.

**Key features:**
- CSS glitch text effect using pseudo-elements and keyframe animations
- Animated stat counters with easing (triggered by IntersectionObserver)
- Floating data particle system (Canvas API)
- Scan-line overlay creating a surveillance aesthetic

### Reveal — Privacy Dashboard ([app.html](app.html))

The analytical core. An interactive tool where users input their digital habits and see their hidden data trail quantified and visualized. Built with real datasets compiled from public sources (Pew Research, Statista, ITRC, IBM).

**11 interactive sections:**
| Section | Description |
|---------|-------------|
| Habit Input | 10 digital activities with checkboxes (social media, search, streaming, etc.) |
| Privacy Score | 0-100 score with color-coded meter (green → yellow → orange → red) |
| Daily Data Trail | Bar chart showing estimated data points collected per habit per day |
| Data Collectors | Doughnut chart showing who profits from your data |
| Hidden Trackers | Real tracker counts by website category (news, shopping, health, etc.) |
| Platform Profiles | What Google, Meta, TikTok, and Amazon collect about you — with revenue per user |
| Privacy Checklist | 14 actionable items with difficulty and impact ratings, progress tracking |
| Protection Tips | 6 practical steps to reduce your digital footprint |
| Privacy Law Timeline | Line chart of global privacy legislation from 1995 to 2024 |
| Data Broker Database | Table of real data brokers — what they collect, how many profiles they hold |
| Breach Timeline | Bar chart of major data breaches 2013-2024 with logarithmic scale |

**JavaScript concepts demonstrated:**
- `Array.filter()`, `Array.map()`, `Array.reduce()` for data processing
- Chart.js integration (4 chart types: bar, doughnut, line, logarithmic bar)
- DOM manipulation and event handling
- State management and real-time UI updates

### Deep — Exploration Game ([game.html](game.html))

A 2D top-down game built with Phaser.js 3.60. The player is a "data diver" navigating through six increasingly dark and dangerous layers of the internet, collecting truth fragments while being chased by trackers.

**6 levels of escalating difficulty:**

| Level | Name | Enemy Speed | Grid |
|-------|------|-------------|------|
| 1 | Surface Web | 50 | 20×14 |
| 2 | Deep Web | 80 | 22×16 |
| 3 | Dark Web | 110 | 24×17 |
| 4 | Surveillance Grid | 130 | 24×17 |
| 5 | Data Fortress | 155 | 24×17 |
| 6 | The Source | 175 | 24×17 |

**Game mechanics:**
- Arrow keys / WASD movement with diagonal normalization
- Chase AI — enemies calculate direction vectors toward the player
- Collect all blue truth fragments to activate the purple portal
- 3 lives (representing "anonymity") — losing all = game over
- Score multiplier increases with each level
- Invulnerability window after taking damage
- DOM keyboard fallback for cross-platform compatibility (Mac/Windows)

**Technical highlights:**
- 5 ES6 scene classes: BootScene, MenuScene, GameScene, GameOverScene, WinScene
- All textures generated programmatically (no image assets)
- Phaser Arcade Physics for collision detection
- Responsive scaling with `Phaser.Scale.FIT`

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| **HTML5 + CSS3** | Structure and styling for all three pages |
| **Vanilla JavaScript** | All logic — no frameworks |
| **Phaser.js 3.60** (CDN) | 2D game engine |
| **Chart.js 4.4** (CDN) | Data visualization |
| **GitHub Pages** | Free static hosting |

**Why this stack:** Single codebase, zero build tools, no npm install — open `index.html` and everything works. CDN libraries mean instant loading and no dependency management.

---

## Project Structure

```
BasisHacks/
├── index.html          # Surface — landing page
├── app.html            # Reveal — privacy dashboard
├── game.html            # Deep — Phaser.js game
├── css/
│   └── style.css       # All styles (301 lines)
├── js/
│   ├── data.js         # Real privacy datasets (133 lines)
│   ├── dashboard.js    # Dashboard logic & charts (290 lines)
│   └── game.js         # Phaser game — 6 levels, 5 scenes (693 lines)
└── README.md
```

---

## Data Sources

All statistics are compiled from reputable public sources:
- **ITRC, CSIS, Privacy Rights Clearinghouse** — data breach records
- **WebXray, WhoTracksMe** — website tracker averages
- **Company disclosures** — data broker profiles
- **Pew Research, Statista** — global privacy statistics
- **IBM Security** — average cost of data breaches
- **UNCTAD** — global privacy legislation tracking

---

## How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/QwQ-1025/BasisHacks-DigitalEchoes.git
   ```
2. Open `index.html` in any modern browser
3. Navigate between Surface → Reveal → Deep using the top nav bar
4. Or serve with a static server:
   ```bash
   python3 -m http.server 8000
   ```

### Live Demo

**[https://qwq-1025.github.io/BasisHacks-DigitalEchoes/](https://qwq-1025.github.io/BasisHacks-DigitalEchoes/)**

---

## Credits

Built by **Max & Forrest** for **BasisHacks 2026**

*"Look deeper. Build boldly. Show the world what lies beneath."*
