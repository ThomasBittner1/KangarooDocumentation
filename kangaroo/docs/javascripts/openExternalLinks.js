document.addEventListener('DOMContentLoaded', () => {
  const selectors = [
    'a.md-tabs__link[href^="http"]',
    'nav.md-nav a[href^="http"]'
  ];
  document.querySelectorAll(selectors.join(',')).forEach(a => {
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener');
});
});