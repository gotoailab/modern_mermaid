# Implementation Plan - Chrome Extension Integration

This plan follows the project workflow.

## Phase 1: Extension Scaffolding [checkpoint: fc3833d]
- [x] Task: Create Extension Manifest (9833493)
    - [ ] Create `public/manifest.json` with basic metadata, permissions, and `action` (popup).
    - [ ] Verify icons are correctly referenced.
- [x] Task: Configure Vite for Extension Output (ac77cab)
    - [ ] Update `vite.config.ts` to ensure assets are correctly bundled for Chrome.
    - [ ] Add a build script alias if needed.
- [x] Task: Conductor - User Manual Verification 'Extension Scaffolding' (Protocol in workflow.md) (fc3833d)

## Phase 2: Extension Behavior Optimization [checkpoint: 5731594]
- [x] Task: Adapt Layout for Popup (5abb968)
    - [ ] Identify and apply CSS classes to handle narrow viewports in extension mode.
    - [ ] Test the editor in a fixed 400x600 container.
- [x] Task: Implement "Open in New Tab" Behavior (ece6ed2)
    - [ ] Remove `default_popup` from `manifest.json`.
    - [ ] Create a background service worker to handle `action.onClicked`.
    - [ ] Update `vite.config.ts` to include the background script in the build.
- [x] Task: Conductor - User Manual Verification 'Extension Behavior Optimization' (Protocol in workflow.md) (5731594)

## Phase 3: Build and Validation [checkpoint: 725ce1b]
- [x] Task: Verify Extension Loading (725ce1b)
    - [ ] Build the project.
    - [ ] Instructions: Load the `dist` folder into Chrome (Developer Mode) and verify the popup opens.
- [x] Task: Conductor - User Manual Verification 'Build and Validation' (Protocol in workflow.md) (725ce1b)
