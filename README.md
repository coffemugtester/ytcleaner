# YouTube Cleaner

A minimalist Chrome extension that removes visual clutter from YouTube by hiding `ytd-rich-section-renderer` elements.

## What it does

Automatically removes distracting design elements from YouTube as you browse. Uses a MutationObserver to handle YouTube's single-page application architecture, so clutter stays gone even as you navigate between videos, playlists, and channels.

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top-right corner)
3. Click "Load unpacked"
4. Select the `ytcleaner` directory (this folder)
5. The extension is now active

## Usage

Just browse YouTube normally. The extension runs automatically on all YouTube pages (`www.youtube.com`).

To verify it's working:
1. Open YouTube
2. Open DevTools (F12 or Cmd+Option+I)
3. Go to the Console tab
4. Look for `[YouTube Cleaner] Loaded and monitoring for clutter elements`
5. Check the Elements tab — `ytd-rich-section-renderer` elements should be removed from the DOM

## Project structure

```
ytcleaner/
├── manifest.json          # Extension configuration (Manifest V3)
├── content.js            # Main logic with MutationObserver
├── icons/               # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md
```

## How it works

1. Content script injects on page load (`document_end`)
2. Initial cleanup removes any existing clutter elements
3. MutationObserver watches the DOM for new elements
4. When YouTube's SPA adds new content, observer detects matching elements
5. Matching elements are removed immediately (not just hidden)

## Development

Built following the Approach C design: MutationObserver + DOM Removal for complete coverage of YouTube's dynamic content loading.

Design document: `~/.gstack/projects/ytcleaner/danielalfaro-main-design-20260410-165617.md`
