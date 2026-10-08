# Spreadsheet Cell Highlighter

A lightweight, highly customizable Google Chrome extension (Manifest V3) that enhances your Google Sheets experience by highlighting the active row and column in real time. Perfect for navigating massive spreadsheets, preventing row/column misalignment, reducing eye fatigue, and boosting data-entry accuracy.

---

## ✨ Features

- **🎯 Real-Time Cell Tracking**
  - Seamlessly tracks the currently focused cell as you navigate via keyboard arrows or mouse clicks.
  - Automatically respects the Google Sheets formula bar and frozen panes to avoid visual clutter.

- **🎨 Two Distinct Highlight Modes**
  - **Line Mode**: Renders clean, high-precision crosshair guide lines along the bottom and right edges of the selected cell.
  - **Cell Mode**: Generates translucent colored bands across the active row and column intersecting directly at the selected cell.

- **📏 Row Highlight Limit**
  - Toggle between extending guides across the entire browser viewport or confining the row guide up to the active cell.

- **🔲 Range Selection Awareness**
  - Intelligently detects multi-cell selection ranges.
  - Option to enable or suppress highlighting when selecting cell blocks to avoid obscuring data during bulk operations.

- **🎛️ Comprehensive Visual Customization**
  - **Color Picker**: Choose any hex color that fits your workflow.
  - **Opacity Control**: Granular slider from `0%` to `100%` to adjust highlight visibility without hiding underlying spreadsheet values.
  - **Line Thickness**: Fine-tune line width from `1px` to `12px` when using Line mode.

- **🌐 Multilingual Support**
  - Built-in localized popup interface supporting:
    - 🇺🇸 **English** (`en`)
    - 🇯🇵 **Japanese** (`ja`)
    - 🇧🇷 **Portuguese (Brazil)** (`pt-BR`)

- **🌓 Dark & Light Mode**
  - Sleek popup interface with instant theme toggling that automatically respects and remembers your preferences.

- **⚡ Lightweight & High Performance**
  - Powered by throttled `requestAnimationFrame` (~20 FPS) and DOM element pooling for smooth performance with near-zero CPU or memory overhead.
  - No bloated dependencies or external libraries.

---

## 🔒 Privacy & Security

Your data privacy is 100% respected:
- **No Data Collection**: Does not read, store, or transmit spreadsheet contents or personal information.
- **Local Storage Only**: User preferences (colors, styles, language) are stored locally in the browser via `chrome.storage.local`.
- **Zero External Requests**: Operates completely offline with no third-party trackers, analytics, or external network requests.
- **Minimal Permissions**: Utilizes only `storage` (saving preferences) and `activeTab` with explicit matching to `https://docs.google.com/spreadsheets/*`.

---

## 🚀 Installation

### Option 1: Load as Unpacked Extension (Developer Mode)

1. Clone or download this repository to your local machine:
   ```bash
   git clone https://github.com/your-username/spreadsheet-cell-highlighter.git
   ```
2. Open Google Chrome (or any Chromium-based browser such as Brave, Edge, or Opera).
3. Navigate to `chrome://extensions/` in the URL bar.
4. Toggle on **Developer mode** in the top-right corner.
5. Click **Load unpacked** in the top-left corner.
6. Select the project directory (`Spreadsheet Cell Highlighter`).
7. The extension icon will now appear in your browser toolbar!

### Option 2: Chrome Web Store
*(Coming soon / check store link once published)*

---

## 📖 How to Use

1. Open any sheet on [Google Sheets](https://docs.google.com/spreadsheets/).
2. Click on any cell — the row and column guide will appear immediately according to your settings.
3. Click the extension icon in your browser toolbar to open the settings popup:
   - **Language**: Switch between English, Japanese, and Portuguese.
   - **Row & Column Highlight**: Toggle the highlighter on or off globally.
   - **Highlight Type**: Switch between **Line** and **Cell** modes.
   - **Row Highlight Limit**: Restrict the horizontal line to stop at the active cell.
   - **Highlight on Range Selection**: Show or hide guides when selecting multiple cells.
   - **Line Thickness**: Adjust line width (Line mode only).
   - **Highlight Color**: Select a custom color from the native color picker.
   - **Opacity**: Adjust guide transparency.

All changes are saved automatically and take effect instantly on open sheets without needing a page refresh.

---

## 📂 Project Structure

```plaintext
Spreadsheet Cell Highlighter/
├── manifest.json              # Chrome Extension Manifest V3 configuration
├── content/
│   ├── content.js             # Core script tracking Google Sheets active cell DOM & rendering overlays
│   └── content.css            # Styles and z-index positioning for guide elements
├── popup/
│   ├── popup.html             # Popup control panel markup
│   ├── popup.js               # Settings logic, internationalization, and theme toggle
│   └── popup.css              # Control panel styling (Light and Dark themes)
├── icons/                     # Extension icons in standard resolutions (16x16, 32x32, 48x48, 128x128)
├── store-assets/              # Promotional graphics and screenshots for Chrome Web Store
├── .gitignore                 # Standard Git ignore file for development
└── README.md                  # Project documentation
```

---

## 🛠️ Technical Details

- **Platform**: Google Chrome Extension (Manifest V3)
- **Permissions**:
  - `storage`: Preserves user settings across sessions and devices.
  - `activeTab`: Grants access to the current Google Sheets tab when invoked.
- **Content Script Scope**: `https://docs.google.com/spreadsheets/*`
- **DOM Detection Strategy**:
  - Automatically identifies active cell boundaries by monitoring Google Sheets DOM markers (`.active-cell-border-box`, `.active-cell-border`, `.waffle-rich-text-editor`, `.autofill-cover`).
  - Clusters disjoint rects and handles range bounding boxes to provide seamless highlight alignment.

---

## 🤝 Contributing

Contributions, feedback, and feature suggestions are welcome!
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — feel free to use, modify, and distribute as needed.
