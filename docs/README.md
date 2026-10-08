# Spreadsheet Cell Highlighter - Landing Page

A modern, responsive, trilingual landing page showcasing the features of the **Spreadsheet Cell Highlighter** Chrome Extension.

## 🌐 Supported Languages
- 🇺🇸 **English** (`en`)
- 🇯🇵 **Japanese / 日本語** (`ja`)
- 🇧🇷 **Portuguese / Português (Brasil)** (`pt-BR`)

## ✨ Highlights & Features
1. **Interactive Spreadsheet Simulator**:
   - Live, in-browser spreadsheet playground.
   - Click cells or use arrow keys (↑, ↓, ←, →).
   - Real-time controls mirroring the extension popup:
     - Toggle highlight on/off
     - Switch between **Line Mode** and **Cell Mode**
     - Limit row highlight to active cell
     - Custom color picker + quick preset palette
     - Opacity slider (10% - 100%)
     - Line thickness slider (1px - 10px)
2. **Visual Showcase & Screenshots**:
   - Tabbed gallery displaying real extension screenshots (Line Mode, Cell Mode, Popup Light, Popup Dark, Promo overview).
3. **Comprehensive Feature Breakdown**:
   - Detailed cards highlighting real-time tracking, privacy, zero latency, performance pooling, and trilingual support.
4. **Interactive Dark & Light Theme**:
   - Matches the extension's native dark/light modes.
5. **Privacy & Security Pillar**:
   - Details zero data collection, offline operation, and Manifest V3 security.
6. **Quick Start & FAQ**:
   - Step-by-step installation guides for both Chrome Web Store and Developer Mode.
   - Interactive FAQ accordion addressing common user questions.

## 📁 File Structure
```plaintext
site/
├── index.html        # Main landing page markup with semantic HTML5 & OpenGraph tags
├── style.css         # Modern styling, CSS variables, glassmorphism, responsive grid
├── app.js            # i18n controller, simulator logic, theme & gallery handlers
├── assets/           # Extension icons, screenshots, and promo graphics
└── README.md         # Documentation for the site
```

## 🚀 How to Run Locally
Simply open `site/index.html` directly in any modern web browser (Chrome, Edge, Firefox, Brave, Safari):
- Double click `index.html` or open via browser URL:
  ```plaintext
  file:///path/to/Spreadsheet Cell Highlighter/site/index.html
  ```
- Or run with any local HTTP server:
  ```bash
  npx serve site
  # or
  python -m http.server 8000
  ```
