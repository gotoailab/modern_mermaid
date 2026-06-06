# Modern Mermaid - Project Overview

A modern, powerful, and beautiful Mermaid.js diagram editor and previewer built with React 19 and Tailwind CSS 4.

## 🚀 Quick Start

### Prerequisites
- Node.js 20.19+ or 22.12+
- pnpm (recommended), npm, or yarn

### Key Commands
- `pnpm install`: Install dependencies.
- `pnpm dev`: Start development server at `http://localhost:5173`.
- `pnpm build`: Build for production (runs `tsc` and `vite build`).
- `pnpm lint`: Run ESLint check.
- `pnpm preview`: Preview production build locally.

## 🛠 Tech Stack
- **UI Framework**: React 19.2
- **Language**: TypeScript 5.9
- **Build Tool**: Vite 7.2
- **Styling**: Tailwind CSS 4.1
- **Diagrams**: Mermaid.js 11.12
- **Icons**: Lucide React
- **Export**: html-to-image

## 🏗 Architecture

### Directory Structure
- `src/components/`: Modular UI components (Editor, Preview, Toolbar, etc.).
- `src/contexts/`: React Contexts for global state (Dark Mode, Language).
- `src/hooks/`: Custom React hooks (Analytics).
- `src/utils/`: Core logic and configurations (Themes, i18n, Fonts, Compression).
- `src/types/`: TypeScript type definitions.
- `public/`: Static assets and PWA icons.
- `docs/`: Documentation and screenshots.

### Key Files
- `src/main.tsx`: Application entry point.
- `src/App.tsx`: Root component with providers.
- `src/utils/themes.ts`: Configuration for 10+ professional Mermaid themes.
- `src/utils/i18n.ts`: Internationalization support for 6 languages.
- `src/utils/compression.ts`: URL state compression using `lz-string`.

## 🎨 Development Conventions

### Styling
- **Tailwind CSS 4**: Uses the new `@tailwindcss/vite` plugin. Favor utility classes for all styling.
- **Theming**: Mermaid themes are customized via `themeVariables` and `themeCSS` in `src/utils/themes.ts`.

### Components
- Use functional components and React 19 features.
- Components should be modular and kept in `src/components/`.

### State Management
- Local state for component-specific logic.
- React Context for global app state (Theme, Language).
- URL-based state for sharing diagrams (compressed using LZ-string).

### Internationalization
- All user-facing strings should be added to `src/utils/i18n.ts` and accessed via the `LanguageContext`.

## 🖼 Features
- **10+ Professional Themes**: Linear, Ghibli, Brutalist, Cyberpunk, etc.
- **Powerful Editor**: Syntax highlighting, auto-completion, and resizable panels.
- **Advanced Export**: High-quality PNG/JPG export with custom resolutions.
- **Annotation Tools**: Drawing tools (arrows, shapes, text) on top of diagrams.
- **Interactive Preview**: Live rendering with zoom/pan and auto-scaling.
