# Specification - Chrome Extension Integration

## Overview
This track involves configuring the existing Vite/React project to support deployment as a Chrome Extension. This includes adding a `manifest.json`, handling extension-specific assets, and ensuring the UI adapts to the popup format.

## Goals
- Add `manifest.json` (MV3) to the project.
- Configure Vite to output extension-friendly assets.
- Implement a popup entry point that loads the Mermaid editor.
- Ensure the editor layout is responsive for the extension popup size (typically 400x600 or similar).

## Scope
- **Configuration:** `public/manifest.json`, `vite.config.ts` updates.
- **Assets:** Extension icons (16, 48, 128).
- **UI Adjustments:** CSS overrides for popup mode.

## Technical Requirements
- Chrome Extension Manifest V3.
- Use `crx` or standard Vite build targets.
- Minimal changes to the core web-app logic to maintain cross-platform compatibility.
