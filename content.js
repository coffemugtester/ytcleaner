// YouTube Cleaner - Removes ytd-rich-section-renderer elements
// Handles YouTube's SPA navigation with MutationObserver

const TARGET_SELECTOR = 'ytd-rich-section-renderer';

// Function to remove all matching elements
function removeClutter() {
  const elements = document.querySelectorAll(TARGET_SELECTOR);
  let removedCount = 0;

  elements.forEach(element => {
    element.remove();
    removedCount++;
  });

  if (removedCount > 0) {
    console.log(`[YouTube Cleaner] Removed ${removedCount} clutter element(s)`);
  }
}

// Initial cleanup on page load
removeClutter();

// Set up MutationObserver to watch for dynamically added elements
const observer = new MutationObserver(mutations => {
  let shouldClean = false;

  // Check if any added nodes match our target or contain matching descendants
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      // Check if node is an element
      if (node.nodeType === Node.ELEMENT_NODE) {
        // Check if the node itself matches
        if (node.matches && node.matches(TARGET_SELECTOR)) {
          shouldClean = true;
          break;
        }
        // Check if node contains matching descendants
        if (node.querySelector && node.querySelector(TARGET_SELECTOR)) {
          shouldClean = true;
          break;
        }
      }
    }
    if (shouldClean) break;
  }

  if (shouldClean) {
    removeClutter();
  }
});

// Start observing the document body for changes
observer.observe(document.body, {
  childList: true,
  subtree: true
});

console.log('[YouTube Cleaner] Loaded and monitoring for clutter elements');
