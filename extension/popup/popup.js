document.addEventListener('DOMContentLoaded', () => {
  const languageSelect = document.getElementById('language-select');
  const labelLanguage = document.getElementById('label-language');
  const labelHighlight = document.getElementById('label-highlight');
  const labelStyle = document.getElementById('label-style');
  const optionLine = document.getElementById('option-line');
  const optionCell = document.getElementById('option-cell');
  const labelRowLimit = document.getElementById('label-row-limit');
  const rowLimitToggle = document.getElementById('row-limit-toggle');
  const labelColLimit = document.getElementById('label-col-limit');
  const colLimitToggle = document.getElementById('col-limit-toggle');
  const labelRangeHighlight = document.getElementById('label-range-highlight');
  const rangeHighlightToggle = document.getElementById('range-highlight-toggle');
  const labelThickness = document.getElementById('label-thickness');
  const labelColor = document.getElementById('label-color');
  const labelOpacity = document.getElementById('label-opacity');

  const themeToggle = document.getElementById('theme-toggle');
  const iconSun = document.getElementById('icon-sun');
  const iconMoon = document.getElementById('icon-moon');
  const highlightToggle = document.getElementById('highlight-toggle');
  const highlightStyle = document.getElementById('highlight-style');
  const thicknessContainer = document.getElementById('thickness-container');
  const lineThickness = document.getElementById('line-thickness');
  const thicknessValue = document.getElementById('thickness-value');
  const highlightColor = document.getElementById('highlight-color');
  const highlightOpacity = document.getElementById('highlight-opacity');
  const opacityValue = document.getElementById('opacity-value');

  const translations = {
    ja: {
      language: '言語',
      highlight: '行列ハイライト',
      style: 'ハイライトの種類',
      optionLine: '線 (Line)',
      optionCell: 'セル全体 (Cell)',
      rowLimit: '行ハイライトの限界',
      colLimit: '列ハイライトの限界',
      rangeHighlight: '範囲選択時のハイライト',
      thickness: '線の太さ',
      color: 'ハイライト色',
      opacity: '透明度',
      themeToggle: 'テーマ切り替え'
    },
    en: {
      language: 'Language',
      highlight: 'Row & Column Highlight',
      style: 'Highlight Type',
      optionLine: 'Line',
      optionCell: 'Cell',
      rowLimit: 'Row Highlight Limit',
      colLimit: 'Column Highlight Limit',
      rangeHighlight: 'Highlight on Range Selection',
      thickness: 'Line Thickness',
      color: 'Highlight Color',
      opacity: 'Opacity',
      themeToggle: 'Toggle Theme'
    },
    'pt-BR': {
      language: 'Idioma',
      highlight: 'Destaque de Linha e Coluna',
      style: 'Tipo de Destaque',
      optionLine: 'Linha',
      optionCell: 'Célula',
      rowLimit: 'Limite da Linha',
      colLimit: 'Limite da Coluna',
      rangeHighlight: 'Destaque na Seleção de Intervalo',
      thickness: 'Espessura da Linha',
      color: 'Cor do Destaque',
      opacity: 'Opacidade',
      themeToggle: 'Alternar Tema'
    }
  };

  function applyLanguage(lang) {
    const t = translations[lang] || translations.ja;
    document.documentElement.lang = lang;
    if (labelLanguage) labelLanguage.textContent = t.language;
    if (labelHighlight) labelHighlight.textContent = t.highlight;
    if (labelStyle) labelStyle.textContent = t.style;
    if (optionLine) optionLine.textContent = t.optionLine;
    if (optionCell) optionCell.textContent = t.optionCell;
    if (labelRowLimit) labelRowLimit.textContent = t.rowLimit;
    if (labelColLimit) labelColLimit.textContent = t.colLimit;
    if (labelRangeHighlight) labelRangeHighlight.textContent = t.rangeHighlight;
    if (labelThickness) labelThickness.textContent = t.thickness;
    if (labelColor) labelColor.textContent = t.color;
    if (labelOpacity) labelOpacity.textContent = t.opacity;
    if (themeToggle) themeToggle.setAttribute('aria-label', t.themeToggle);
  }

  // Load settings from storage
  chrome.storage.local.get({
    lang: 'ja',
    theme: 'light',
    enabled: true,
    rowLimit: true,
    colLimit: true,
    rangeHighlight: true,
    style: 'line',
    thickness: 2,
    color: '#ffff00',
    opacity: 20
  }, (items) => {
    // Apply language
    applyLanguage(items.lang);
    if (languageSelect) languageSelect.value = items.lang;

    // Apply theme
    setTheme(items.theme);

    // Apply values to UI
    highlightToggle.checked = items.enabled;
    if (rowLimitToggle) rowLimitToggle.checked = items.rowLimit;
    if (colLimitToggle) colLimitToggle.checked = items.colLimit;
    if (rangeHighlightToggle) rangeHighlightToggle.checked = items.rangeHighlight;
    highlightStyle.value = items.style;
    lineThickness.value = items.thickness;
    thicknessValue.textContent = `${items.thickness}px`;
    highlightColor.value = items.color;
    highlightOpacity.value = items.opacity;
    opacityValue.textContent = `${items.opacity}%`;

    // Toggle visibility based on style
    updateThicknessVisibility(items.style);
  });

  // Save settings when changed
  if (languageSelect) {
    languageSelect.addEventListener('change', (e) => {
      applyLanguage(e.target.value);
      saveSettings();
    });
  }

  highlightToggle.addEventListener('change', () => {
    saveSettings();
  });

  if (rowLimitToggle) {
    rowLimitToggle.addEventListener('change', () => {
      saveSettings();
    });
  }

  if (colLimitToggle) {
    colLimitToggle.addEventListener('change', () => {
      saveSettings();
    });
  }

  if (rangeHighlightToggle) {
    rangeHighlightToggle.addEventListener('change', () => {
      saveSettings();
    });
  }

  highlightStyle.addEventListener('change', (e) => {
    updateThicknessVisibility(e.target.value);
    saveSettings();
  });

  lineThickness.addEventListener('input', (e) => {
    thicknessValue.textContent = `${e.target.value}px`;
    saveSettings();
  });

  highlightColor.addEventListener('input', () => {
    saveSettings();
  });

  highlightOpacity.addEventListener('input', (e) => {
    opacityValue.textContent = `${e.target.value}%`;
    saveSettings();
  });

  // Theme toggle
  themeToggle.addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    setTheme(newTheme);
    saveSettings();
  });

  function setTheme(theme) {
    if (theme === 'dark') {
      document.body.setAttribute('data-theme', 'dark');
      iconSun.style.display = 'block';
      iconMoon.style.display = 'none';
    } else {
      document.body.removeAttribute('data-theme');
      iconSun.style.display = 'none';
      iconMoon.style.display = 'block';
    }
  }

  function updateThicknessVisibility(style) {
    if (style === 'line') {
      thicknessContainer.style.display = 'flex';
    } else {
      thicknessContainer.style.display = 'none';
    }
  }

  function saveSettings() {
    const lang = languageSelect ? languageSelect.value : 'ja';
    const theme = document.body.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const enabled = highlightToggle.checked;
    const rowLimit = rowLimitToggle ? rowLimitToggle.checked : true;
    const colLimit = colLimitToggle ? colLimitToggle.checked : true;
    const rangeHighlight = rangeHighlightToggle ? rangeHighlightToggle.checked : true;
    const style = highlightStyle.value;
    const thickness = parseInt(lineThickness.value, 10);
    const color = highlightColor.value;
    const opacity = parseInt(highlightOpacity.value, 10);

    chrome.storage.local.set({
      lang: lang,
      theme: theme,
      enabled: enabled,
      rowLimit: rowLimit,
      colLimit: colLimit,
      rangeHighlight: rangeHighlight,
      style: style,
      thickness: thickness,
      color: color,
      opacity: opacity
    });
  }
});
