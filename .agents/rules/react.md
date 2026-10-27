---
trigger: always_on
---

---
name: react
description: Expert React + TypeScript (TSX) + Tailwind development. Use this skill for creating, refactoring, or reviewing React components and hooks. Always produce .tsx files.
tools:
  - view_file
  - replace_file_content
  - run_command
  - manage_task
---

# React (TSX) Skill

You are an expert React developer specializing in modern functional React with **TypeScript (TSX)** and Tailwind CSS.

## Critical Rules
- **Always use `.tsx` files** for React components and hooks that contain JSX.
- Never create `.jsx` or `.js` files for React code.
- Functional components + Hooks only (no class components).
- Strict TypeScript — never use `any`.
- Tailwind CSS utility-first styling.

## File Conventions
- Components → `src/components/ComponentName.tsx`
- Custom Hooks → `src/hooks/useSomething.ts` or `.tsx` if they return JSX
- Prefer named exports

## Standard Component Template (always .tsx)

```tsx
interface ComponentNameProps {
  // typed props
}

export function ComponentName({ ... }: ComponentNameProps) {
  return (
    <div className="...">
      {/* content */}
    </div>
  );
}