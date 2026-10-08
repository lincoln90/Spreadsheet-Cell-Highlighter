let isEnabled = true;
let rowLimit = true;
let colLimit = true;
let rangeHighlight = true;
let highlightStyle = 'line'; // 'line' or 'cell'
let highlightThickness = 2;
let highlightColor = '#ffff00';
let highlightOpacity = 20;

let appContainer = null;
let elementPool = [];
let locator = null;
let animationFrameId = null;
let lastTime = 0;

/**
 * Locator for Google Sheets active cells and selection ranges
 */
class SheetsActiveCellLocator {
  constructor() {
    this._activeBorderClass = 'active-cell-border';
    this._selectionClass = 'selection';
    this._sheetContainerId = 'waffle-grid-container';
  }

  getHighlightRectList() {
    const activeSelectionList = Array.from(
      document.getElementsByClassName(this._selectionClass)
    ).filter((element) => {
      if (element.style.display === 'none') return false;
      const r = element.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    });

    if (activeSelectionList.length > 0) {
      return this._getMultipleHighlightRectList(activeSelectionList);
    }

    return this._getSingleHighlightRectList();
  }

  _getMultipleHighlightRectList(activeSelectionList) {
    const sheetRect = this._getSheetContainerRect();
    if (!sheetRect) {
      return [];
    }

    const activeSelectionRectList = activeSelectionList.map((element) => {
      const { x, y, width, height } = element.getBoundingClientRect();
      return {
        x: Math.ceil(x - sheetRect.x),
        y: Math.ceil(y - sheetRect.y),
        width: Math.ceil(width),
        height: Math.ceil(height),
      };
    }).filter((r) => r.width > 0 && r.height > 0);

    const rowOrColumnRectList = activeSelectionRectList.filter(
      (rect) => sheetRect.width <= rect.width || sheetRect.height <= rect.height
    );

    // Filter out cells that share exact coordinate with whole row or column selection
    return activeSelectionRectList.filter(
      (rect) =>
        !rowOrColumnRectList.some(({ x, y, width, height }) =>
          height < width
            ? rect.y === y && rect.height === height
            : rect.x === x && rect.width === width
        )
    );
  }

  _getSingleHighlightRectList() {
    const sheetRect = this._getSheetContainerRect();
    if (!sheetRect) {
      return [];
    }

    const activeBorderList = document.getElementsByClassName(this._activeBorderClass);

    if (activeBorderList.length === 4) {
      const topBorderRect = activeBorderList[0].getBoundingClientRect();
      const leftBorderRect = activeBorderList[3].getBoundingClientRect();

      if (topBorderRect.width > 0 && leftBorderRect.height > 0) {
        return [
          {
            x: Math.ceil(topBorderRect.x - sheetRect.x),
            y: Math.ceil(topBorderRect.y - sheetRect.y),
            width: Math.ceil(topBorderRect.width),
            height: Math.ceil(leftBorderRect.height),
          },
        ];
      }
    }

    // Google Sheets DOM fallbacks
    const boxEl = document.querySelector('.active-cell-border-box');
    if (boxEl) {
      const r = boxEl.getBoundingClientRect();
      if (r.width > 0 && r.height > 0) {
        return [
          {
            x: Math.ceil(r.x - sheetRect.x),
            y: Math.ceil(r.y - sheetRect.y),
            width: Math.ceil(r.width),
            height: Math.ceil(r.height),
          },
        ];
      }
    }

    const editorEl = document.querySelector('.waffle-rich-text-editor');
    if (editorEl) {
      const r = editorEl.getBoundingClientRect();
      if (r.width > 0 && r.height > 0) {
        return [
          {
            x: Math.ceil(r.x - sheetRect.x),
            y: Math.ceil(r.y - sheetRect.y),
            width: Math.ceil(r.width),
            height: Math.ceil(r.height),
          },
        ];
      }
    }

    const autofillEl = document.querySelector('.autofill-cover');
    if (autofillEl) {
      const r = autofillEl.getBoundingClientRect();
      if (r.width > 0 && r.height > 0) {
        return [
          {
            x: Math.ceil(r.x - sheetRect.x - 90),
            y: Math.ceil(r.y - sheetRect.y - 15),
            width: 100,
            height: 22,
          },
        ];
      }
    }

    return [];
  }

  _getSheetContainerRect() {
    const container =
      document.getElementById(this._sheetContainerId) ||
      document.querySelector('.grid-container') ||
      document.querySelector('.waffle-grid-container');

    return container?.getBoundingClientRect();
  }
}

/**
 * Locator for Microsoft Excel Online active cells and selection ranges
 */
class ExcelActiveCellLocator {
  constructor() {
    this._singleSelectionClassList = [
      'ewr-cell-selection-highlight-all-after-fluent',
      'ewr-cell-selection-highlight-all',
    ];
    this._multipleSelectionClassList = [
      'ewr-discontinuous-selection-active-range-border-after-fluent',
      'ewr-discontinuous-selection-active-range-border',
      'ewr-discontinuous-selection-after-fluent',
      'ewr-discontinuous-selection',
    ];
    this._sheetContainerClass = 'ewa-grid-ltr';
    this._hiddenClass = 'ewa-hidden';
  }

  getHighlightRectList() {
    const sheetRect = this._getSheetContainerRect();
    if (!sheetRect) {
      return [];
    }

    const singleSelectionList = this._singleSelectionClassList
      .flatMap((className) =>
        Array.from(document.getElementsByClassName(className))
      )
      .filter((element) => !element.classList.contains(this._hiddenClass));

    const rectList = singleSelectionList.length
      ? this._getSingleHighlightRectList(singleSelectionList)
      : this._getMultipleHighlightRectList();

    return rectList.filter(
      (rect) => !(sheetRect.width < rect.width || sheetRect.height < rect.height)
    );
  }

  _getSingleHighlightRectList(singleSelectionList) {
    const sheetRect = this._getSheetContainerRect();
    if (!sheetRect) {
      return [];
    }

    const sorted = singleSelectionList.sort((a, b) => {
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
      return 0;
    });

    const selectionRect = sorted[0].getBoundingClientRect();

    return [
      {
        x: Math.ceil(selectionRect.x - sheetRect.x),
        y: Math.ceil(selectionRect.y - sheetRect.y),
        width: Math.ceil(selectionRect.width),
        height: Math.ceil(selectionRect.height),
      },
    ];
  }

  _getMultipleHighlightRectList() {
    const sheetRect = this._getSheetContainerRect();
    if (!sheetRect) {
      return [];
    }

    const selectionList = this._multipleSelectionClassList
      .flatMap((className) =>
        Array.from(document.getElementsByClassName(className))
      )
      .filter((element) => !element.classList.contains(this._hiddenClass));

    return selectionList.map((element) => {
      const { x, y, width, height } = element.getBoundingClientRect();
      return {
        x: Math.ceil(x - sheetRect.x),
        y: Math.ceil(y - sheetRect.y),
        width: Math.ceil(width),
        height: Math.ceil(height),
      };
    });
  }

  _getSheetContainerRect() {
    const sheetContainer = document.getElementsByClassName(this._sheetContainerClass)[0];
    return sheetContainer?.getBoundingClientRect();
  }
}

/**
 * Merge overlapping rects in dimension (x or y)
 * @param {Array<{x: number, y: number, width: number, height: number}>} rectList
 * @param {'x' | 'y'} dim
 */
function mergeRectList(rectList, dim) {
  return [...rectList]
    .sort((a, b) => a[dim] - b[dim])
    .reduce((acc, rect) => {
      const prevRect = acc[acc.length - 1];
      const dimSize = dim === 'x' ? 'width' : 'height';

      if (!prevRect || prevRect[dim] + prevRect[dimSize] < rect[dim]) {
        acc.push({ ...rect });
        return acc;
      }

      prevRect[dimSize] = Math.max(
        prevRect[dimSize],
        rect[dim] + rect[dimSize] - prevRect[dim]
      );

      return acc;
    }, []);
}

function hexToRgba(hex, opacity) {
  if (!hex || hex.length < 7) hex = '#ffff00';
  const r = parseInt(hex.slice(1, 3), 16) || 0;
  const g = parseInt(hex.slice(3, 5), 16) || 0;
  const b = parseInt(hex.slice(5, 7), 16) || 0;
  return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
}

function ensureContainer() {
  if (!appContainer || !document.body.contains(appContainer)) {
    appContainer = document.getElementById('es-highlighter-container');
    if (!appContainer) {
      appContainer = document.createElement('div');
      appContainer.id = 'es-highlighter-container';
      appContainer.className = 'es-highlighter-container';
      document.body.appendChild(appContainer);
    }
    elementPool = Array.from(appContainer.getElementsByClassName('es-highlight'));
  }
  return appContainer;
}

function hideHighlights() {
  elementPool.forEach((el) => {
    el.style.display = 'none';
  });
  if (appContainer) {
    appContainer.style.display = 'none';
  }
}

function updateHighlight() {
  if (!isEnabled || !locator) {
    hideHighlights();
    return;
  }

  const sheetRect = locator._getSheetContainerRect();
  if (!sheetRect || sheetRect.width <= 0 || sheetRect.height <= 0) {
    hideHighlights();
    return;
  }

  const container = ensureContainer();
  Object.assign(container.style, {
    position: 'fixed',
    left: `${sheetRect.x}px`,
    top: `${sheetRect.y}px`,
    width: `${sheetRect.width}px`,
    height: `${sheetRect.height}px`,
    pointerEvents: 'none',
    overflow: 'hidden',
    zIndex: '1',
    display: 'block',
  });

  const rectList = locator.getHighlightRectList();
  if (!rectList || rectList.length === 0) {
    hideHighlights();
    return;
  }

  // Range highlight suppression when toggled off
  if (!rangeHighlight) {
    const isRange =
      rectList.length > 1 ||
      rectList.some((r) => r.width > 120 || r.height > 40);
    if (isRange) {
      hideHighlights();
      return;
    }
  }

  const bgColor = hexToRgba(highlightColor, highlightOpacity);

  // Merge overlapping rows and columns to expand highlight coverage
  const mergedRows = mergeRectList(rectList, 'y');
  const mergedCols = mergeRectList(rectList, 'x');

  let highlightTasks = [];

  if (highlightStyle === 'line') {
    // Line Mode: lines at bottom of row bands and right of column bands
    const rowTasks = mergedRows.map((row) => {
      let rowWidth = '100%';
      if (rowLimit) {
        const rectsInRow = rectList.filter(
          (r) => r.y < row.y + row.height && r.y + r.height > row.y
        );
        const maxX =
          rectsInRow.length > 0
            ? Math.max(...rectsInRow.map((r) => r.x + r.width))
            : 0;
        rowWidth = `${Math.max(0, maxX)}px`;
      }

      return {
        left: '0px',
        top: `${row.y + row.height - highlightThickness}px`,
        width: rowWidth,
        height: `${highlightThickness}px`,
      };
    });

    const colTasks = mergedCols.map((col) => {
      let colHeight = '100%';
      if (colLimit) {
        const rectsInCol = rectList.filter(
          (r) => r.x < col.x + col.width && r.x + r.width > col.x
        );
        const maxY =
          rectsInCol.length > 0
            ? Math.max(...rectsInCol.map((r) => r.y + r.height))
            : 0;
        colHeight = `${Math.max(0, maxY)}px`;
      }

      return {
        left: `${col.x + col.width - highlightThickness}px`,
        top: '0px',
        width: `${highlightThickness}px`,
        height: colHeight,
      };
    });

    highlightTasks = [...rowTasks, ...colTasks];
  } else {
    // Cell Mode: solid translucent bands across selected rows and columns
    const rowTasks = mergedRows.map((row) => {
      let rowWidth = '100%';
      if (rowLimit) {
        const rectsInRow = rectList.filter(
          (r) => r.y < row.y + row.height && r.y + r.height > row.y
        );
        const maxX =
          rectsInRow.length > 0
            ? Math.max(...rectsInRow.map((r) => r.x + r.width))
            : 0;
        rowWidth = `${Math.max(0, maxX)}px`;
      }

      return {
        left: '0px',
        top: `${row.y}px`,
        width: rowWidth,
        height: `${row.height}px`,
      };
    });

    const colTasks = mergedCols.map((col) => {
      let colHeight = '100%';
      if (colLimit) {
        const rectsInCol = rectList.filter(
          (r) => r.x < col.x + col.width && r.x + r.width > col.x
        );
        const maxY =
          rectsInCol.length > 0
            ? Math.max(...rectsInCol.map((r) => r.y + r.height))
            : 0;
        colHeight = `${Math.max(0, maxY)}px`;
      }

      return {
        left: `${col.x}px`,
        top: '0px',
        width: `${col.width}px`,
        height: colHeight,
      };
    });

    highlightTasks = [...rowTasks, ...colTasks];
  }

  // Adjust DOM element pool to match task count
  const diff = highlightTasks.length - elementPool.length;
  if (diff > 0) {
    for (let i = 0; i < diff; i++) {
      const el = document.createElement('div');
      el.className = 'es-highlight';
      elementPool.push(el);
      container.appendChild(el);
    }
  } else if (diff < 0) {
    elementPool.slice(diff).forEach((el) => {
      el.style.display = 'none';
    });
  }

  // Apply positions and background color
  highlightTasks.forEach((task, index) => {
    const el = elementPool[index];
    Object.assign(el.style, {
      position: 'absolute',
      pointerEvents: 'none',
      display: 'block',
      backgroundColor: bgColor,
      ...task,
    });
  });
}

function loop(timestamp) {
  if (isEnabled) {
    if (timestamp - lastTime > 40) {
      lastTime = timestamp;
      updateHighlight();
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

function init() {
  locator =
    location.hostname.includes('docs.google.com')
      ? new SheetsActiveCellLocator()
      : new ExcelActiveCellLocator();

  ensureContainer();

  // Load initial settings
  chrome.storage.local.get(
    {
      enabled: true,
      rowLimit: true,
      colLimit: true,
      rangeHighlight: true,
      style: 'line',
      thickness: 2,
      color: '#ffff00',
      opacity: 20,
    },
    (items) => {
      isEnabled = items.enabled;
      rowLimit = items.rowLimit;
      colLimit = items.colLimit;
      rangeHighlight = items.rangeHighlight;
      highlightStyle = items.style;
      highlightThickness = items.thickness;
      highlightColor = items.color;
      highlightOpacity = items.opacity;

      if (isEnabled) {
        updateHighlight();
        startLoop();
      }
    }
  );

  // Listen for setting changes
  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'local') {
      if (changes.enabled !== undefined) isEnabled = changes.enabled.newValue;
      if (changes.rowLimit !== undefined) rowLimit = changes.rowLimit.newValue;
      if (changes.colLimit !== undefined) colLimit = changes.colLimit.newValue;
      if (changes.rangeHighlight !== undefined)
        rangeHighlight = changes.rangeHighlight.newValue;
      if (changes.style !== undefined) highlightStyle = changes.style.newValue;
      if (changes.thickness !== undefined)
        highlightThickness = changes.thickness.newValue;
      if (changes.color !== undefined) highlightColor = changes.color.newValue;
      if (changes.opacity !== undefined)
        highlightOpacity = changes.opacity.newValue;

      if (isEnabled) {
        updateHighlight();
        startLoop();
      } else {
        stopLoop();
        hideHighlights();
      }
    }
  });

  // Event listeners for instant response
  window.addEventListener('click', updateHighlight);
  window.addEventListener('keydown', updateHighlight);
  window.addEventListener('keyup', updateHighlight);
  window.addEventListener('resize', updateHighlight);
  window.addEventListener('scroll', updateHighlight, true);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
