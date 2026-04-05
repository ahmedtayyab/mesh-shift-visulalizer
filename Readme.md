# Mesh Circular Shift Visualizer

An interactive web application that simulates and visualizes **circular q-shift** on a 2D mesh topology — PDC Assignment 02, Question 4.

## 🔗 Live Demo
> **Deploy URL:** *(paste your Netlify/Vercel URL here after deployment)*

---

## What it does

In parallel computing, a circular q-shift moves data from node `i` to node `(i + q) mod p`.  
On a 2D mesh this is done efficiently in **two stages**:

| Stage | Operation | Steps |
|-------|-----------|-------|
| Stage 1 | Row shift right by `q mod √p` | `q mod √p` |
| Stage 2 | Col shift down by `⌊q / √p⌋` | `⌊q / √p⌋` |

**Total mesh steps = (q mod √p) + ⌊q/√p⌋**, vs ring's `min(q, p−q)` — always ≤ ring.

---

## Features

- **Input Controls** — enter `p` (4–64, perfect square) and `q` (1 to p−1) with live validation
- **3-panel grid display** — Initial state / After Stage 1 / After Stage 2 with arrows
- **Step-by-step animation** — play, pause, step forward/back, adjustable speed
- **Complexity panel** — live chart comparing mesh vs ring steps across all q values
- **Verification** — confirms each node received the correct data

---

## Project Structure

```
mesh-shift-visualizer/
├── public/
├── src/
│   ├── components/
│   │   ├── MeshGrid.*        ← grid rendering + animation
│   │   ├── ControlPanel.*    ← user inputs
│   │   └── ComplexityPanel.* ← analysis panel
│   ├── utils/
│   │   └── shiftLogic.js     ← pure shift algorithm (testable)
│   ├── App.*
│   └── index.js
├── index.html                ← standalone deployable app
├── README.md
└── package.json
```

---

## Running Locally

```bash
git clone https://github.com/YOUR_USERNAME/mesh-shift-visualizer
cd mesh-shift-visualizer

# Option A: No build step needed — just open index.html
open index.html

# Option B: Use a simple dev server
npx serve .
# or
python -m http.server 8080
```

Then open `http://localhost:8080` in your browser.

---

## Deployment (Netlify — free)

1. Push this repo to GitHub (must be **public**)
2. Go to [netlify.com](https://netlify.com) → **Add new site → Import from Git**
3. Select your repo, leave all build settings blank (no build command needed)
4. Click **Deploy** — your live URL appears in ~30 seconds
5. Paste the URL into this README and into your PDF report screenshot

---

## Algorithm

### Stage 1 — Row Shift
Each node at grid position `(r, c)` sends its data to `(r, (c + rowShift) mod √p)` where `rowShift = q mod √p`. All rows shift simultaneously.

### Stage 2 — Column Shift  
Each node at `(r, c)` (after Stage 1) sends to `((r + colShift) mod √p, c)` where `colShift = ⌊q / √p⌋`. All columns shift simultaneously.

### Worked Example (p=16, q=6)
- `√p = 4`, `rowShift = 6 mod 4 = 2`, `colShift = ⌊6/4⌋ = 1`
- Node 0 at (0,0) → after row shift → (0,2) → after col shift → (1,2) = position 6
- Node 0's data ends up at position 6 = (0+6) mod 16 ✓
- **Mesh steps: 2+1=3** vs **Ring steps: min(6,10)=6** → 2× faster

---

## Author
PDC Spring-2026 · FAST CFD Campus