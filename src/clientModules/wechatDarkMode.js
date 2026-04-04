// Force dark mode in WeChat's in-app browser.
// WeChat applies its own forced dark filter on top of the page, but reports
// prefers-color-scheme: light, causing light-theme CSS (dark text) to render
// on a forcibly-darkened background — making text invisible.
if (typeof window !== 'undefined') {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('micromessenger')) {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.dataset.theme = 'dark';
    try {
      localStorage.setItem('theme', 'dark');
    } catch (e) {
      // localStorage may be restricted in WeChat
    }
  }
}
