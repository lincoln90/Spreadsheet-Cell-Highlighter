let isEnabled = true;
let rowLimit = true;
let highlightStyle = 'line'; // 'line' or 'cell'
let highlightThickness = 2;
let highlightColor = '#ffff00';
let highlightOpacity = 20;

let hlRowLeft, hlRowRight, hlColTop, hlColBottom;
let highlights = [];
let animationFrameId = null;
let lastTime = 0;

// Store target dimensions
let targetRect = { top: -1000, left: -1000, width: 0, height: 0 };
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
    rowLimit: true,
    style: 'line',
    thickness: 2,
    color: '#ffff00',
    opacity: 20
  }, (items) => {
    isEnabled = items.enabled;
    rowLimit = items.rowLimit;
    highlightStyle = items.style;
    highlightThickness = items.thickness;
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
      if (changes.rowLimit !== undefined) rowLimit = changes.rowLimit.newValue;
      if (changes.style !== undefined) highlightStyle = changes.style.newValue;
      if (changes.thickness !== undefined) highlightThickness = changes.thickness.newValue;
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

  const gridTop = getGridTop();

  for (const selector of possibleSelectors) {
    const elements = document.querySelectorAll(selector);
    const validRects = [];

    for (const el of elements) {
      const rect = el.getBoundingClientRect();
      // Ensure the element is at least partially visible on screen
      if (
        rect.width > 0 &&
        rect.height > 0 &&
        rect.bottom > gridTop &&
        rect.right > 0 &&
        rect.top < window.innerHeight &&
        rect.left < window.innerWidth
      ) {
        // Skip elements that are suspiciously large (e.g. whole column highlights by Sheets)
        if (rect.height > window.innerHeight * 0.8 || rect.width > window.innerWidth * 0.8) {
          continue;
        }
        validRects.push(rect);
      }
    }

    if (validRects.length > 0) {
      // Cluster overlapping rects so that separate/disjoint selection boxes across different
      // columns or rows (e.g. focus cell box vs range selection box) are not incorrectly merged.
      const clusters = [];

      for (const rect of validRects) {
        let addedToCluster = false;
        for (const cluster of clusters) {
          const overlaps = cluster.some(cRect => {
            const hOverlap = Math.max(rect.left, cRect.left) < Math.min(rect.right, cRect.right) - 1;
            const vOverlap = Math.max(rect.top, cRect.top) < Math.min(rect.bottom, cRect.bottom) - 1;
            return hOverlap && vOverlap;
          });

          if (overlaps) {
            cluster.push(rect);
            addedToCluster = true;
            break;
          }
        }
        if (!addedToCluster) {
          clusters.push([rect]);
        }
      }

      // Iteratively merge clusters if adding a new rect bridged two existing clusters
      let merged = true;
      while (merged) {
        merged = false;
        for (let i = 0; i < clusters.length; i++) {
          for (let j = i + 1; j < clusters.length; j++) {
            const c1 = clusters[i];
            const c2 = clusters[j];
            const touches = c1.some(r1 =>
              c2.some(r2 => {
                const hOverlap = Math.max(r1.left, r2.left) < Math.min(r1.right, r2.right) - 1;
                const vOverlap = Math.max(r1.top, r2.top) < Math.min(r1.bottom, r2.bottom) - 1;
                return hOverlap && vOverlap;
              })
            );
            if (touches) {
              c1.push(...c2);
              clusters.splice(j, 1);
              merged = true;
              break;
            }
          }
          if (merged) break;
        }
      }

      // Find the cluster with the maximum bounding area (representing the primary active selection)
      let bestCluster = null;
      let maxArea = -1;

      for (const cluster of clusters) {
        let minTop = Infinity, minLeft = Infinity, maxBottom = -Infinity, maxRight = -Infinity;
        for (const r of cluster) {
          minTop = Math.min(minTop, r.top);
          minLeft = Math.min(minLeft, r.left);
          maxBottom = Math.max(maxBottom, r.bottom);
          maxRight = Math.max(maxRight, r.right);
        }
        const width = maxRight - minLeft;
        const height = maxBottom - minTop;
        const area = width * height;
        if (area > maxArea) {
          maxArea = area;
          bestCluster = { minTop, minLeft, maxBottom, maxRight, width, height };
        }
      }

      if (bestCluster) {
        if (selector === '.autofill-cover') {
          return {
            top: bestCluster.minTop - 21 + bestCluster.height,
            left: bestCluster.minLeft - 100 + bestCluster.width,
            width: 100,
            height: 21
          };
        }
        return {
          top: bestCluster.minTop,
          left: bestCluster.minLeft,
          width: bestCluster.width,
          height: bestCluster.height
        };
      }
    }
  }

  return null;
}

function getGridTop() {
  // Google Sheets formula bar is a reliable separator
  const formulaBar = document.querySelector('#formula-bar');
  if (formulaBar) {
    const rect = formulaBar.getBoundingClientRect();
    if (rect.bottom > 0) return rect.bottom;
  }
  // Fallback to grid container
  const gridContainer = document.querySelector('.grid-container') || document.querySelector('.waffle-grid-container');
  if (gridContainer) {
    const rect = gridContainer.getBoundingClientRect();
    if (rect.top > 0) return rect.top;
  }
  // Default to 0 if nothing works
  return 0;
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

      if (hlRowLeft.style.display !== 'block') {
        highlights.forEach(hl => hl.style.display = 'block');
      }
      
      const gridTop = getGridTop();

      const rowWidth = rowLimit
        ? Math.max(0, targetRect.left + targetRect.width)
        : window.innerWidth;

      if (highlightStyle === 'line') {
        // Draw lines stopping at the cell or extending to full width depending on rowLimit.
        // Vertical line is on the right side of the cell.
        // Horizontal line is on the bottom side of the cell.
        const lineThickness = highlightThickness;
        const cy = targetRect.top + targetRect.height;
        const cx = targetRect.left + targetRect.width;

        hlRowLeft.style.top = cy + 'px';
        hlRowLeft.style.left = '0px';
        hlRowLeft.style.height = lineThickness + 'px';
        hlRowLeft.style.width = rowWidth + 'px';

        hlRowRight.style.display = 'none';

        hlColTop.style.left = cx + 'px';
        hlColTop.style.top = gridTop + 'px';
        hlColTop.style.width = lineThickness + 'px';
        hlColTop.style.height = Math.max(0, targetRect.top + targetRect.height - gridTop) + 'px';

        hlColBottom.style.display = 'none';
      } else {
        // Draw cell bands stopping at the cell (covering the cell itself to form the intersection)
        hlRowLeft.style.top = targetRect.top + 'px';
        hlRowLeft.style.left = '0px';
        hlRowLeft.style.height = targetRect.height + 'px';
        hlRowLeft.style.width = rowWidth + 'px';

        hlRowRight.style.display = 'none';

        hlColTop.style.left = targetRect.left + 'px';
        hlColTop.style.top = gridTop + 'px';
        hlColTop.style.width = targetRect.width + 'px';
        // Stop at the bottom edge of the selected cell
        hlColTop.style.height = Math.max(0, targetRect.top + targetRect.height - gridTop) + 'px';

        hlColBottom.style.display = 'none';
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
