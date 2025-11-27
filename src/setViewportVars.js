// Sets CSS variables --vh and --lvh to provide a stable viewport-height value
// that doesn't jump when mobile browser UI (address bar/toolbars) shows/hides.
// Import this module early (e.g. in `src/index.js`) so variables are available to CSS.

function updateViewportVars() {
  try {
    const innerH = window.innerHeight || document.documentElement.clientHeight;
    // --vh is 1% of the *current* viewport height in pixels
    const vh = innerH * 0.01;
    // set as pixel value so CSS can do calc(var(--vh) * N)
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    // For a "large" viewport fallback we set --lvh to the largest known height
    // observed during the session. This approximates the `lvh` CSS unit on
    // browsers that support it and gives a stable value when the address bar
    // shrinks the layout viewport.
    const prev =
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--lvh")
      ) || 0;
    const prevPx = prev || 0;
    // Convert prevPx (if set as e.g. "7.5px") to numeric px value
    const prevNumeric = prevPx;

    // We want --lvh to represent the maximum 1% value seen so far, so when the
    // browser UI collapses it won't reduce this value.
    const current = vh;
    const max = Math.max(current, prevNumeric || 0);
    document.documentElement.style.setProperty("--lvh", `${max}px`);
  } catch (e) {
    // defensive: some environments may not allow access yet
    // silently fail but don't break app
    // eslint-disable-next-line no-console
    console.warn("setViewportVars failed", e);
  }
}

// Run on load
updateViewportVars();

// Update on visualViewport resize when available (better for mobile address bar changes)
if (window.visualViewport) {
  window.visualViewport.addEventListener("resize", () => updateViewportVars());
  window.visualViewport.addEventListener("scroll", () => updateViewportVars());
}

// Also update on regular resize/orientation changes and when page becomes visible
window.addEventListener("resize", () => updateViewportVars());
window.addEventListener("orientationchange", () =>
  setTimeout(updateViewportVars, 200)
);
document.addEventListener("visibilitychange", () =>
  setTimeout(updateViewportVars, 250)
);

export default updateViewportVars;
