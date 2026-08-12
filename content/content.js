let isEnabled = true;
let highlightStyle = 'line'; // 'line' or 'cell'
let highlightColor = '#ffff00';
let highlightOpacity = 20;

let hlRowLeft, hlRowRight, hlColTop, hlColBottom;
let highlights = [];
let animationFrameId = null;
let lastTime = 0;

// Store target dimensions
let targetRect = { top: -1000, left: -1000, width: 0, height: 0 };
let lastMousePos = { x: -1000, y: -1000 };

function init() {
  // Create overlay elements (reused to avoid DOM churn)
  hlRowLeft = document.createElement('div');
  hlRowRight = document.createElement('div');
  hlColTop = document.createElement('div');
  hlColBottom = document.createElement('div');
  
  highlights = [hlRowLeft, hlRowRight, hlColTop, hlColBottom];
  
  highlights.forEach(hl => {
    hl.className = 'es-highlight';
    document.body.appendChild(hl);
  });

  // Load initial settings
  chrome.storage.local.get({
    enabled: true,
    style: 'line',
    color: '#ffff00',
    opacity: 20
  }, (items) => {
    isEnabled = items.enabled;
    highlightStyle = items.style;
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
      if (changes.style !== undefined) highlightStyle = changes.style.newValue;
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
  highlights.forEach(hl => {
    hl.style.backgroundColor = bgColor;
  });
}

function hideHighlights() {
  highlights.forEach(hl => {
    hl.style.display = 'none';
  });
}

function findActiveCellRect() {
  // Try to find elements that represent the active cell in Google Sheets.
  // Google Sheets DOM can vary; we check a few common markers.
  const possibleSelectors = [
    '.active-cell-border-box', // Sometimes used for single cell box
    '.active-cell-border', // Border of selected cell
    '.waffle-rich-text-editor', // Input field when cell is active
    '.autofill-cover' // Fallback to fill handle if nothing else
  ];

  for (const selector of possibleSelectors) {
    const elements = document.querySelectorAll(selector);
    for (const el of elements) {
      const rect = el.getBoundingClientRect();
      // Ensure the element is visible on screen
      if (rect.width > 0 && rect.height > 0 && rect.top >= 0 && rect.left >= 0) {
        // Skip elements that are suspiciously large (e.g. whole column highlights by Sheets)
        if (rect.height > window.innerHeight * 0.8 || rect.width > window.innerWidth * 0.8) {
          continue;
        }

        if (rect.top > 0 || rect.left > 0) {
          // If we fallback to autofill-cover, adjust to simulate cell
          if (selector === '.autofill-cover') {
            return {
              top: rect.top - 21 + rect.height, // Approximate top based on 21px height
              left: rect.left - 100 + rect.width, // Approximate left based on 100px width
              width: 100,
              height: 21
            };
          }
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
      if (hlRowLeft.style.display !== 'block') {
        highlights.forEach(hl => hl.style.display = 'block');
      }
      
      const ww = window.innerWidth;
      const wh = window.innerHeight;

      if (highlightStyle === 'line') {
        // Draw 2px lines centering on the cell, stopping at the cell
        const lineThickness = 2;
        const cy = targetRect.top + targetRect.height / 2 - lineThickness / 2;
        const cx = targetRect.left + targetRect.width / 2 - lineThickness / 2;

        hlRowLeft.style.top = cy + 'px';
        hlRowLeft.style.left = '0px';
        hlRowLeft.style.height = lineThickness + 'px';
        hlRowLeft.style.width = Math.max(0, targetRect.left) + 'px';

        hlRowRight.style.top = cy + 'px';
        hlRowRight.style.left = (targetRect.left + targetRect.width) + 'px';
        hlRowRight.style.height = lineThickness + 'px';
        hlRowRight.style.width = Math.max(0, ww - (targetRect.left + targetRect.width)) + 'px';

        hlColTop.style.left = cx + 'px';
        hlColTop.style.top = '0px';
        hlColTop.style.width = lineThickness + 'px';
        hlColTop.style.height = Math.max(0, targetRect.top) + 'px';

        hlColBottom.style.left = cx + 'px';
        hlColBottom.style.top = (targetRect.top + targetRect.height) + 'px';
        hlColBottom.style.width = lineThickness + 'px';
        hlColBottom.style.height = Math.max(0, wh - (targetRect.top + targetRect.height)) + 'px';
      } else {
        // Draw cell bands stopping at the cell
        hlRowLeft.style.top = targetRect.top + 'px';
        hlRowLeft.style.left = '0px';
        hlRowLeft.style.height = targetRect.height + 'px';
        hlRowLeft.style.width = Math.max(0, targetRect.left) + 'px';

        hlRowRight.style.top = targetRect.top + 'px';
        hlRowRight.style.left = (targetRect.left + targetRect.width) + 'px';
        hlRowRight.style.height = targetRect.height + 'px';
        hlRowRight.style.width = Math.max(0, ww - (targetRect.left + targetRect.width)) + 'px';

        hlColTop.style.left = targetRect.left + 'px';
        hlColTop.style.top = '0px';
        hlColTop.style.width = targetRect.width + 'px';
        hlColTop.style.height = Math.max(0, targetRect.top) + 'px';

        hlColBottom.style.left = targetRect.left + 'px';
        hlColBottom.style.top = (targetRect.top + targetRect.height) + 'px';
        hlColBottom.style.width = targetRect.width + 'px';
        hlColBottom.style.height = Math.max(0, wh - (targetRect.top + targetRect.height)) + 'px';
      }
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
