// Preserve URL hash when switching locale via the navbar dropdown
if (typeof window !== 'undefined') {
  document.addEventListener('click', (e) => {
    // Find if the click is on a locale dropdown link
    const link = e.target.closest('.dropdown__link[href]');
    if (!link) return;

    // Check if it's a locale switch link (same path, different locale prefix)
    const currentHash = window.location.hash;
    if (!currentHash) return;

    const href = link.getAttribute('href');
    // Locale links look like /ja/travel/australia or /zh/travel/australia
    // Only append hash if the link doesn't already have one
    if (href && !href.includes('#')) {
      e.preventDefault();
      window.location.href = href + currentHash;
    }
  });
}
