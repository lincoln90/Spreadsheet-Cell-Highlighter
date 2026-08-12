let isEnabled = true;
let highlightColor = '#ffff00';
let highlightOpacity = 20;

let rowHighlight, colHighlight;
let animationFrameId = null;
let lastTime = 0;

// Store target dimensions
let targetRect = { top: -1000, left: -1000, width: 0, height: 0 };
let lastMousePos = { x: -1000, y: -1000 };

function init() {
  // Create overlay elements (reused to avoid DOM churn)
  rowHighlight = document.createElement('div');
  rowHighlight.className = 'es-highlight-row';
  
  colHighlight = document.createElement('div');
  colHighlight.className = 'es-highlight-col';
  
  document.body.appendChild(rowHighlight);
  document.body.appendChild(colHighlight);

  // Load initial settings
  chrome.storage.local.get({
    enabled: true,
    color: '#ffff00',
    opacity: 20
  }, (items) => {
    isEnabled = items.enabled;
    highlightColor = items.color;
    highlightOpacity = items.opacity;
    updateStyles();
    
    if (isEnabled) {
      startLoop();
    }
  });

  // Listen for setting changes
  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'local') {
      if (changes.enabled !== undefined) isEnabled = changes.enabled.newValue;
      if (changes.color !== undefined) highlightColor = changes.color.newValue;
      if (changes.opacity !== undefined) highlightOpacity = changes.opacity.newValue;
      
      updateStyles();
      
      if (isEnabled) {
        startLoop();
      } else {
        stopLoop();
        hideHighlights();
      }
    }
  });

  // Track mouse position as a fallback and for hover
  document.addEventListener('mousemove', (e) => {
    if (!isEnabled) return;
    lastMousePos.x = e.clientX;
    lastMousePos.y = e.clientY;
  }, { passive: true });
}

function hexToRgba(hex, opacity) {
  let r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
}

function updateStyles() {
  const bgColor = hexToRgba(highlightColor, highlightOpacity);
  rowHighlight.style.backgroundColor = bgColor;
  colHighlight.style.backgroundColor = bgColor;
}

function hideHighlights() {
  rowHighlight.style.display = 'none';
  colHighlight.style.display = 'none';
}

function findActiveCellRect() {
  // Try to find elements that represent the active cell in Google Sheets.
  // Google Sheets DOM can vary; we check a few common markers.
  const possibleSelectors = [
    '.autofill-cover', // Fill handle of selected cell
    '.active-cell-border', // Border of selected cell
    '.waffle-rich-text-editor' // Input field when cell is active
  ];

  for (const selector of possibleSelectors) {
    const el = document.querySelector(selector);
    if (el) {
      const rect = el.getBoundingClientRect();
      // Ensure the element is visible on screen
      if (rect.width > 0 && rect.height > 0 && rect.top >= 0 && rect.left >= 0) {
        // If it's the rich text editor, it might be moved off-screen when not typing
        if (rect.top > 0 && rect.left > 0) {
          return rect;
        }
      }
    }
  }
  
  return null;
}

function loop(timestamp) {
  if (!isEnabled) return;
  
  // Throttle DOM querying to roughly 20 FPS to maintain low overhead
  if (timestamp - lastTime > 50) {
    lastTime = timestamp;
    const rect = findActiveCellRect();
    
    if (rect) {
      targetRect.top = rect.top;
      targetRect.left = rect.left;
      targetRect.width = rect.width;
      targetRect.height = rect.height;
    } else {
      // Fallback: If no cell element is found (e.g. canvas rendering), track mouse
      targetRect.top = lastMousePos.y - 10;
      targetRect.left = lastMousePos.x - 50;
      targetRect.width = 100;
      targetRect.height = 21; // Approximate row height
    }

    // Apply the position if valid
    if (targetRect.top >= 0 && targetRect.left >= 0) {
      if (rowHighlight.style.display === 'none') {
        rowHighlight.style.display = 'block';
        colHighlight.style.display = 'block';
      }
      
      // Update dimensions
      rowHighlight.style.top = targetRect.top + 'px';
      rowHighlight.style.height = targetRect.height + 'px';
      
      colHighlight.style.left = targetRect.left + 'px';
      colHighlight.style.width = targetRect.width + 'px';
    } else {
      hideHighlights();
    }
  }

  animationFrameId = requestAnimationFrame(loop);
}

function startLoop() {
  if (!animationFrameId) {
    lastTime = performance.now();
    animationFrameId = requestAnimationFrame(loop);
  }
}

function stopLoop() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
