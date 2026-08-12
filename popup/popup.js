document.addEventListener('DOMContentLoaded', () => {
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

  // Load settings from storage
  chrome.storage.local.get({
    theme: 'light',
    enabled: true,
    style: 'line',
    thickness: 2,
    color: '#ffff00',
    opacity: 20
  }, (items) => {
    // Apply theme
    setTheme(items.theme);

    // Apply values to UI
    highlightToggle.checked = items.enabled;
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
  highlightToggle.addEventListener('change', () => {
    saveSettings();
  });

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
    const theme = document.body.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const enabled = highlightToggle.checked;
    const style = highlightStyle.value;
    const thickness = parseInt(lineThickness.value, 10);
    const color = highlightColor.value;
    const opacity = parseInt(highlightOpacity.value, 10);

    chrome.storage.local.set({
      theme: theme,
      enabled: enabled,
      style: style,
      thickness: thickness,
      color: color,
      opacity: opacity
    });
  }
});
