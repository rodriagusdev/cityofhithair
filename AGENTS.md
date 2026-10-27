# Frontend Architecture & Coding Standards
## 1. State Management & Async Flows
- NEVER use multiple loose boolean or nullable states (e.g., `isA`, `isB`, `itemTo`, `itemFrom`) to track multi-step async workflows.
- ALWAYS use Discriminated Union Finite State Machines (FSMs) or reusable custom hooks (like `useTravelFlow`).
- Cross-component communication MUST go through Zustand stores. NEVER use `window.dispatchEvent` or ad-hoc DOM events.

## 2. Application Shell & Layouts
- Persistent UI elements (music player, ambient audio, global HUDs, low health vignette, game-over listeners) MUST live in top-level shell components (e.g., `MapMain.tsx` or `App.tsx`), NEVER duplicated across individual screens or views.
- Keep view components minimal: they should solely coordinate their local scene and delegate to sub-panels and Zustand stores.

## 3. Z-Index and Layering Hierarchy
- NEVER use arbitrary z-index numbers like `z-[9999]`, `z-[99999]`, or `z-[999999]`.
- Stacking order strictly follows:
  - Base content / Room background / Interrogation scene: `z-0` to `z-10`
  - Screen controls / top bars: `z-20`
  - HUD / Investigation Menu / Global timers: `z-30`
  - Screen Modals / Dialogs / Dossiers: `z-40`
  - Urgent Overlays (Newspapers / Travel Animation): `z-50`
  - Toasts / Notifications: `z-60`

## 4. Component Boundaries & Styling
- Any repeated or visually rich item inside `.map()` (e.g., Polaroid cards) MUST be extracted into its own component file under `components/buttons/` or `components/Level/`.
- Screen components must not exceed 250 lines; extract sub-panels (headers, frames, lists) when reached.
- **Scroll & Hover Scaling**: Containers holding cards with `hover:scale-*` MUST use `overflow-y-auto overflow-x-hidden` combined with sufficient padding (`px-3.5` or `p-3+`). NEVER leave `overflow-x` open to prevent horizontal scrollbar flicker on hover.

## 5. Narrative & Dialogue Architecture
- **Serializable Graphs**: NEVER store callbacks or closures (`createDialog: () => void`) in Zustand stores or data definitions. Navigation must use pure node IDs (`targetNodeId`) and action discriminators (`action: 'close' | 'trade' | 'victory'`).
- **Entity-Data Decoupling**: NEVER bind options or handlers to entities via array indices (`options[index]`). Entities MUST use explicit string IDs (`npc.id: 'marion'`) mapping to dictionary registries.
- **Unified Screen Modals**: NEVER duplicate dialogue frames or modals for specific story NPCs/bosses. Parameterize visual variants using themes (`theme: 'crimson' | 'occult' | 'iron'`) and capability flags (`hasShop?: boolean`).
- **Graph Branching**: Dialogues must use graph nodes (`nodes[nodeId].choices`), leaving the architecture open for multi-hop branching while providing clean return (`targetNodeId: 'root'`) and exit paths.