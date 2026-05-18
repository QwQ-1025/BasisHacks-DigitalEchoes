# Digital Echoes — BasisHacks 2026

**Theme: Beneath the Surface**

The internet you see is only 4%. Every click, search, and scroll leaves a hidden trail of data. Data brokers trade your information. Algorithms shape your reality. Trackers follow you everywhere. **Digital Echoes** reveals what lies beneath the surface of your digital life.

---

## The Three Layers

| Layer | Component | What It Does |
|-------|-----------|-------------|
| **Surface** | Landing Page (`index.html`) | A clean portal that hints at hidden depth — glitch effects, animated stats, and a call to dive deeper |
| **Reveal** | Privacy Dashboard (`app.html`) | Interactive tool: input your digital habits, see your hidden data trail visualized with real statistics |
| **Deep** | Exploration Game (`game.html`) | 2D top-down game: navigate through the Surface Web, Deep Web, and Dark Web — collect truth fragments, dodge trackers, uncover what's hidden |

---

## How to Run

1. Clone this repository
2. Open `index.html` in any modern browser
3. Navigate between Surface → Reveal → Deep using the top nav bar
4. Or serve with any static server:

```bash
# Python
python3 -m http.server 8000

# Node.js
npx serve .
```

---

## Tech Stack

- **HTML5 + CSS3 + Vanilla JavaScript** — no frameworks, no build step
- **Phaser.js 3.60** (CDN) — 2D game engine for the Deep layer
- **Chart.js 4.4** (CDN) — data visualization for the Reveal layer
- **GitHub Pages** — free hosting

---

## Project Structure

```
├── index.html          # Surface — landing page
├── app.html            # Reveal — privacy dashboard
├── game.html            # Deep — Phaser.js game
├── css/
│   └── style.css       # All styles
├── js/
│   ├── data.js         # Real privacy datasets
│   ├── dashboard.js    # Dashboard logic & charts
│   └── game.js         # Phaser game (3 levels, 5 scenes)
└── README.md
```

---

## Game Controls

| Key | Action |
|-----|--------|
| Arrow Keys / WASD | Move the data diver |
| Enter | Start game / Restart |

- Collect all **blue truth fragments** to activate the portal
- **Avoid red trackers** — each hit costs a life
- Reach the **purple portal** to dive to the next layer
- Survive all 3 layers to reveal the truth

---

## Datasets

The dashboard uses real statistics compiled from public sources:
- Data breach records (ITRC, CSIS, Privacy Rights Clearinghouse)
- Website tracker averages (WebXray, WhoTracksMe)
- Data broker profiles (company disclosures)
- Global privacy statistics (Pew Research, Statista, IBM)

---

## Credits

Built by **Max & Forrest** for **BasisHacks 2026**

*"Look deeper. Build boldly. Show the world what lies beneath."*
