# Level Units & Encounter Architecture Reference

This document maps all files across the codebase that define, configure, spawn, animate, and manage **units in levels** in *City of Hithair*.

---

## 1. Unit & Level Definitions (Data Layer)

* [**`src/data/general/enemies.ts`**](file:///c:/dev/Personal/cityofhithair/src/data/general/enemies.ts)
  * **Primary enemy database.** Defines all enemy instances grouped by level:
    * `cemeteryData`: Skeleton (x2), Dark Knight Maevir
    * `mausoleumData`: Skeleton (x2), Dark Knight Lucard, Dark Knight Eldare
    * `darkPassageData`: The Cannibal
    * `lostGalleryData`: Hawnyr (Werewolf), Dark Knight Lazarus
  * Sets vitals, stats (health, attack, defense, criticalChance, magic, darkMastery), level key, SFX callbacks, and assigned skill lists.
* [**`src/data/skills/combat.ts`**](file:///c:/dev/Personal/cityofhithair/src/data/skills/combat.ts)
  * Standard physical attacks equipped by level enemies.
* [**`src/data/skills/darkmagic.ts`**](file:///c:/dev/Personal/cityofhithair/src/data/skills/darkmagic.ts)
  * Spells equipped by caster/boss units (`Drain Life`, `Weakness`, `Vulnerability`).
* [**`src/data/loot/index.ts`**](file:///c:/dev/Personal/cityofhithair/src/data/loot/index.ts)
  * Defines loot rewards dropped when all units in a specific level are cleared (`cemeteryLoot`, `mausoleumLoot`, `darkPassageLoot`, `lostGalleryLoot`).

---

## 2. Level Progression & Enemy State (Store Layer)

* [**`src/stores/useLevelsStore.ts`**](file:///c:/dev/Personal/cityofhithair/src/stores/useLevelsStore.ts)
  * **Level State Manager.** Tracks:
    * Active dungeon level flags (`isInCemetery`, `isInMausoleum`, `isInDarkPassage`, `isInLostGallery`, `isInHeartPrison`).
    * Active enemy arrays per level (`cemeteryEnemies`, `mausoleumEnemies`, `dPassageEnemies`, `lostGalleryEnemies`).
    * `updateLevelEnemies(levelKey, unitId)`: Removes an enemy from its level when defeated.
    * Level completion tracking (`levelsCompletion`).
* [**`src/stores/useBattleStore.ts`**](file:///c:/dev/Personal/cityofhithair/src/stores/useBattleStore.ts)
  * Tracks the active combat encounter: `boardEnemy`, current phase, turn, intent, stagger, and parry state.

---

## 3. Level Exploration & Unit Rendering (UI Layer)

* [**`src/components/Map/Levels/Levels.tsx`**](file:///c:/dev/Personal/cityofhithair/src/components/Map/Levels/Levels.tsx)
  * Displays the active dungeon level background and renders each enemy unit present in that level.
* [**`src/components/Enemy/Enemy.tsx`**](file:///c:/dev/Personal/cityofhithair/src/components/Enemy/Enemy.tsx)
  * Individual clickable enemy portrait badge in a level. Clicking engages combat with that unit.
* [**`src/components/Map/NextLevel/NextLevel.tsx`**](file:///c:/dev/Personal/cityofhithair/src/components/Map/NextLevel/NextLevel.tsx)
  * Map navigation component that transitions between City and dungeon levels.
* [**`src/components/Board/Board.tsx`**](file:///c:/dev/Personal/cityofhithair/src/components/Board/Board.tsx)
  * The active battlefield rendering the engaged level unit against the player hero.

---

## 4. Combat Behavior, AI & Resolution (Combat Layer)

* [**`src/features/combat/enemyAi.ts`**](file:///c:/dev/Personal/cityofhithair/src/features/combat/enemyAi.ts)
  * **Enemy AI & Encounter Specs.**
  * Configures multi-strike counts per enemy archetype (`totalHits`, `requiredParries`).
  * Calculates parry reaction windows and generates thematic telegraph battle barks.
  * Defines stagger thresholds (`getEnemyStaggerThreshold`).
* [**`src/features/combat/useCombat.ts`**](file:///c:/dev/Personal/cityofhithair/src/features/combat/useCombat.ts)
  * Core combat loop orchestrating turns, strikes, deflections, and stagger.
  * `handleEnemyDeath(enemy)`: Removes defeated enemy from level state and checks if the level was cleared.
* [**`src/features/components/Board/useLoot.ts`**](file:///c:/dev/Personal/cityofhithair/src/features/components/Board/useLoot.ts)
  * Resolves loot drops, lore tomes, and marks dungeon completion when a level's enemies are eradicated.

---

## 5. Visual Sprites & Animations

* [**`src/features/sprites/spriteRegistry.ts`**](file:///c:/dev/Personal/cityofhithair/src/features/sprites/spriteRegistry.ts)
  * Resolves a level unit to its animated sprite sheets by name, alias, or portrait asset.
* [**`src/features/sprites/characters/`**](file:///c:/dev/Personal/cityofhithair/src/features/sprites/characters/)
  * Individual character sprite definitions:
    * [**`skeleton.ts`**](file:///c:/dev/Personal/cityofhithair/src/features/sprites/characters/skeleton.ts): Skeleton enemies
    * [**`darkKnight.ts`**](file:///c:/dev/Personal/cityofhithair/src/features/sprites/characters/darkKnight.ts): Maevir, Lucard, Eldare, Lazarus
    * [**`werewolf.ts`**](file:///c:/dev/Personal/cityofhithair/src/features/sprites/characters/werewolf.ts): Hawnyr
    * [**`cannibal.ts`**](file:///c:/dev/Personal/cityofhithair/src/features/sprites/characters/cannibal.ts): The Cannibal
    * [**`darkSorcerer.ts`**](file:///c:/dev/Personal/cityofhithair/src/features/sprites/characters/darkSorcerer.ts): Dark mages & sorcerers
* [**`src/features/sprites/useUnitAnimationState.ts`**](file:///c:/dev/Personal/cityofhithair/src/features/sprites/useUnitAnimationState.ts)
  * Drives active animation states (`idle`, `ready`, `attack`, `hit`, `die`, `parry`).

---

## 6. Type Definitions

* [**`src/types.d.ts`**](file:///c:/dev/Personal/cityofhithair/src/types.d.ts)
  * Defines the core `Unit` and `Player` interfaces.
* [**`src/features/combat/types.ts`**](file:///c:/dev/Personal/cityofhithair/src/features/combat/types.ts)
  * Defines combat intent, parry, stagger, and combat action structures.
