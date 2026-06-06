# Product Guidelines

## Prose Style & Voice
- **Tone:** Professional yet approachable. The language should be clear and concise, catering to both technical experts and beginners.
- **Clarity:** Avoid jargon where possible. When technical terms are necessary (e.g., "syntax highlighting", "PWA"), ensure the context makes them understandable.
- **Action-Oriented:** Use active verbs for instructions (e.g., "Click to export", "Select a theme").

## Visual Identity & UX
- **Aesthetic:** Modern, clean, and high-contrast. The interface should feel like a premium tool, even though it's open-source.
- **Consistency:** Use the established Tailwind color palette. Ensure that custom themes (Cyberpunk, Ghibli) only affect the preview area, while the main UI remains stable and usable.
- **Responsiveness:** The layout must be fluid. The resizable divider and panels must work seamlessly across different screen sizes.

## Design Principles
- **Preview-First:** The diagram preview is the most important element. Ensure it is always prominent and scales correctly.
- **Zero Configuration:** The app should be immediately usable upon loading. Default settings (theme, font, example code) should be chosen for maximum initial impact.
- **Non-Destructive Editing:** Features like annotations should be easily undoable or removable without affecting the underlying Mermaid code.

## Accessibility
- **Contrast:** Ensure high contrast for text and interactive elements, especially in Dark Mode.
- **Keyboard Navigation:** Support common shortcuts (Cmd+S, Cmd+C) and ensure toolbar items are reachable via keyboard.
- **Internationalization:** Maintain support for all 6 target languages in every new feature.
