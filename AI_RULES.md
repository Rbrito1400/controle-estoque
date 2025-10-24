# AI Development Rules

This document outlines the technology stack and development guidelines for the AI assistant working on this project.

## Tech Stack

- **Framework:** React (bootstrapped with Vite).
- **Language:** TypeScript for type safety and improved developer experience.
- **Styling:** Tailwind CSS for all styling. No custom CSS files should be used.
- **UI Components:** `shadcn/ui` is the primary component library. It provides accessible and customizable components built on top of Radix UI and Tailwind CSS.
- **Icons:** `lucide-react` for a consistent and clean set of icons.
- **Routing:** `react-router-dom` for all client-side routing and navigation.
- **State Management:** Start with React's built-in hooks (`useState`, `useContext`). Avoid complex state management libraries unless the application's complexity demands it.
- **Code Quality:** ESLint and Prettier are configured to enforce a consistent code style.

## Library Usage Rules

- **UI Components:**
  - **ALWAYS** use components from the `shadcn/ui` library (`@/components/ui/*`) for common UI elements like buttons, inputs, tables, dialogs, etc.
  - If a `shadcn/ui` component doesn't fit the exact need, create a new, custom component in the `src/components` directory.
  - Do not add new libraries for UI components without a strong justification.

- **Styling:**
  - **NEVER** write plain CSS in `.css` files.
  - **ALWAYS** use Tailwind CSS utility classes for styling directly within your TSX files.
  - Use the `cn` utility from `@/lib/utils` to conditionally apply classes.

- **Icons:**
  - **ONLY** use icons from the `lucide-react` package. This ensures visual consistency across the application.

- **Routing:**
  - All application routes should be defined within `src/App.tsx` using `react-router-dom`.
  - Create new page components inside the `src/pages` directory.

- **State Management:**
  - For local component state, use `useState`.
  - For state that needs to be shared between a few components, lift state up to the nearest common ancestor.
  - For app-wide state, use `useContext` with `useReducer` for more complex logic.

- **File Structure:**
  - All source code must reside in the `src/` directory.
  - Reusable components go in `src/components/`.
  - Page-level components go in `src/pages/`.
  - Utility functions go in `src/lib/` or `src/utils/`.