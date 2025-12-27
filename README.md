# Portfolio Website

A minimal, content-first portfolio website for documenting systems engineering work and engineering notes.

## Principles

- Static, fast, minimal JavaScript
- Content over visuals
- No client-side state or routing
- Flat component structure

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Structure

```
src/
├── App.tsx          # Flat section composition
├── index.css        # Global styles
└── sections/        # Page sections
    ├── Header.tsx
    ├── EngineeringNotes.tsx
    ├── CurrentWork.tsx
    └── Footer.tsx
```
