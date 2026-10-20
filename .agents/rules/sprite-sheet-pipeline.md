# Rule: Autonomous Sprite Sheet Pipeline

When the user asks to add, update, or reimplement a sprite sheet or character animation:

## 1. Zero Questions & Permanent Permission Policy (Full Autonomy)
- **Permanent Permission Granted:** The user has permanently granted complete permission to unwrap, slice, backup, and modify sprite sheets in `src/assets/`, generate horizontal strips, edit `scripts/unwrap_sprites.py`, create or modify character configurations in `src/features/sprites/characters/`, update `spriteRegistry.ts`, and run terminal scripts/typechecks.
- **DO NOT ask the user questions, confirmations, or permissions** regarding permissions, file modifications, command executions, frame counts, dimensions, looping rules, or naming conventions.
- Never pause or block to ask for permission for any sprite-pipeline step. Make autonomous executive decisions based on the established pipeline below and execute directly to completion.

---

## 2. Automated Inspection & Unwrapping Pipeline
All sprite sheets rendered by the animation engine require a **1-row horizontal strip** (`width = frameCount * frameWidth`, `height = frameHeight`). Multi-row grids must be unwrapped automatically:

1. **Cell Size Standard:**
   - Standard cell size is **`168 × 168 px`** (or `166.67 × 166 px` for legacy skeleton/idle).
2. **Grid Detection & Bounding Box Analysis:**
   - Run a Python PIL script to detect grid dimensions (e.g., 4 cols × 3 rows = 672×504).
   - Use `cell.getbbox()` across all cells in order (row by row, left to right).
   - Count only non-empty frames (ignore trailing blank/transparent cells).
3. **Backup Original Grid:**
   - Save the raw multi-row grid to `src/assets/<name>_original_grid.png`.
4. **Horizontal Strip Generation:**
   - Create a transparent RGBA image of size `(frameCount * 168, 168)`.
   - Paste each non-empty frame in order horizontally.
   - Save directly to `src/assets/<name>.png`.

---

## 3. Configuration & State Mapping Conventions
In `src/features/sprites/characters/<character>.ts`:

- **State Aliasing:**
  - `attack*` → `attack`
  - `hurt*` / `hit*` → both `hit` and `hurt`
  - `parry*` / `defend*` → both `parry` and `defend`
  - `death*` / `die*` → both `die` and `death`
  - `spell*` / `cast*` → both `cast` and `spell`
  - `ready*` → `ready`
  - `idle*` → `idle`
- **Looping & Speed Defaults:**
  - Action states (`attack`, `hit`, `hurt`, `parry`, `defend`, `die`, `death`, `cast`): `loop: false`, `fps: 10`.
  - Passive states (`idle`, `victory`): `loop: true`, `fps: 10`.
  - Death states: `loop: false`, `fps: 10`, `holdLastFrame: true`.

---

## 4. Verification
- Verify that `useUnitAnimationState.ts` and `types.ts` support the state and trigger it at the appropriate combat phase.
- Always run `cmd.exe /c npm run typecheck` and verify there are zero TypeScript errors.
