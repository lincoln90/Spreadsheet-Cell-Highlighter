document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const iconSun = document.getElementById('icon-sun');
  const iconMoon = document.getElementById('icon-moon');
  const highlightToggle = document.getElementById('highlight-toggle');
  const highlightColor = document.getElementById('highlight-color');
  const highlightOpacity = document.getElementById('highlight-opacity');
  const opacityValue = document.getElementById('opacity-value');

  // Load settings from storage
  chrome.storage.local.get({
    theme: 'light',
    enabled: true,
    color: '#ffff00',
    opacity: 20
  }, (items) => {
    // Apply theme
    setTheme(items.theme);

    // Apply values to UI
    highlightToggle.checked = items.enabled;
    highlightColor.value = items.color;
    highlightOpacity.value = items.opacity;
    opacityValue.textContent = `${items.opacity}%`;
  });

  // Save settings when changed
  highlightToggle.addEventListener('change', () => {
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

  function saveSettings() {
    const theme = document.body.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const enabled = highlightToggle.checked;
    const color = highlightColor.value;
    const opacity = parseInt(highlightOpacity.value, 10);

    chrome.storage.local.set({
      theme: theme,
      enabled: enabled,
      color: color,
      opacity: opacity
    });
  }
});
