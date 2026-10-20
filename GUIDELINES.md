# City of Hithair — Design, Combat & Style Guidelines

This document serves as the single source of truth for combat formulas, spell mechanics, parry systems, and aesthetic design philosophy for **City of Hithair**.

---

## 1. Combat & Damage Calculation Formulas

### 1.1 Physical Attack Damage
Physical damage from basic attacks and weapon strikes is determined by the attacker's attack power mitigated by the defender's armor defense:

$$\text{Mitigation Multiplier} = \max\left(0, 1 - \frac{\text{Defender Defense}}{10}\right)$$

$$\text{Base Damage} = \max\left(1, \lceil \text{Attacker Attack} \times \text{Mitigation Multiplier} \rceil\right)$$

* **Critical Strike Check:** A random roll from $1$ to $100$ is made against `Attacker Critical Chance`:
  * If $\text{Roll} \le \text{Attacker Critical Chance}$, it is a **Critical Hit**:
    $$\text{Final Damage} = \text{round}(\text{Base Damage} \times 2)$$
  * Otherwise, $\text{Final Damage} = \text{Base Damage}$.
* **Negative Defense (Flanked / Shattered Armor):** If a defender has negative defense (e.g. from *Sacrifice* where defense is $-3$), the mitigation multiplier exceeds $1.0$ (e.g. $1 - (-0.3) = 1.3$), causing amplified vulnerability damage.

---

## 2. Spells & Status Effect Mechanics

Every active spell buff and debuff operates with a **3-Turn Duration Lifecycle**. At the end of each turn, turn counters decrement. When expired, the stat modifiers are cleanly reverted.

### 2.1 Spells Overview

| Spell / Action | Caster | Cost | Duration | Formula & Effect |
| :--- | :--- | :--- | :--- | :--- |
| **Attack** | Knight / Wizard / Enemy | 0 | Instant | Standard physical damage using `calculateDamage`. |
| **Dark Magic: Attack** | Dark Wizard | 0 | Instant | Physical damage + lifesteal healing caster: $\text{Heal} = 1 + \text{darkMastery}$ (capped at `maxHealth`). |
| **Defend** | Knight / Dark Wizard | 2 SP | 3 Turns | Increases defense by $+1$. Decreases incoming physical damage by $+10\%$. |
| **Frenzy** | Knight / Dark Wizard | 2 SP | 3 Turns | $+7$ Attack, $-2$ Defense. High-risk offensive stance. |
| **Sacrifice** | Knight | 2 SP + 11 HP | 3 Turns | Weapon attack dealing regular damage to enemy, but shatters enemy armor by $-3$ Defense (sets `vulnerabilityStatus`). |
| **Weakness** | Dark Wizard / Enemy | 2 SP | 3 Turns | Reduces target Attack by: $\text{target.attack} \times (0.30 + 0.07 \times \text{darkMastery})$. |
| **Vulnerability** | Dark Wizard / Enemy | 2 SP | 3 Turns | Flat armor shred: $\text{target.defense} -= (1 + \text{darkMastery})$. |
| **Drain Life** | Dark Wizard / Enemy | 3 SP | Instant | Steals health from target: $\text{Drain} = 10 + (2 \times \text{darkMastery})$. Heals caster by the same amount. |
| **Potion Of Life** | Player | 1 Health Potion | Instant | Restores $+15$ HP. **Does not consume turn.** |
| **Potion Of Magic** | Player | 1 Mana Potion | Instant | Restores $+3$ Spiritual Power. **Does not consume turn.** |

---

## 3. Parry & Reaction System Specifications

Parrying is a core timing-based mechanic designed to reward player observation and skill without turning the game into a mindless QTE.

### 3.1 Core Rules

1. **Physical Attacks vs. Spells:**
   * **Physical Attacks (e.g. Maul, Slash, Thrust):** Can be parried by default if timed correctly during the sweet spot.
   * **Magical Spells (e.g. Drain Life, Weakness, Vulnerability):**
     * **Spiritual Power Requirement:** The player **must possess at least 2 Spiritual Power (Magic $\ge 2$)** to enter the focus state required to deflect magical essence.
     * **No SP Drain:** Deflecting a spell **does NOT consume** Spiritual Power; having $\ge 2$ SP acts as a concentration prerequisite.
     * If player has $< 2$ SP when attempting to parry a spell, the parry fails with feedback: *"Need 2 Spiritual Power to parry spells!"*.

2. **Enemy-Specific Parry Windows & Multi-Hit Flurries:**
   Parry timing varies by enemy anatomy, speed, and telegraph duration. Certain enemies execute multi-hit attacks requiring sequential parries to deflect the full combo:

| Enemy | Action | Flurry Strikes | Parries Needed | Total Telegraph | Parry Sweet Spot Window | Difficulty / Feel |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Skeleton** | Bone Thrust | 2 Strikes | 1 Parry | 1400ms | 900ms – 1400ms (500ms) | Fast, snappy jab combo. |
| **Werewolf** | Vicious Maul | 5 Strikes | 2 Parries | 1400ms | 1050ms – 1400ms (350ms) | Ferocious 5-claw maul combo. |
| **Cannibal** | Cleaver Frenzy | 3 Strikes | 2 Parries | 1500ms | 1100ms – 1500ms (400ms) | Heavy cleaver chops. |
| **Dark Knight** | Crushing Flurry | 3 Strikes | 2 Parries | 1700ms | 1400ms – 1700ms (300ms) | Slow, weighty, devastating swings. |
| **Magical Spells** | Spell Channel | 1 Surge | 1 Parry | 1600ms | 1350ms – 1600ms (250ms) | Swirling dark aura requiring $\ge 2$ SP. |

3. **Parry Outcomes:**
   * **Full Combo Deflection (Landed all required parries):** Incoming damage reduced to $0$. Status effects negated. Enemy takes **+1 Posture Damage**.
   * **Partial Deflection:** If an attack has 5 strikes and 1 parry was landed, the player only takes the remaining 4 strikes of damage (`(totalHits - parriesLanded) * damagePerStrike`).
   * **Too Early / Missed:** Player takes all incoming strikes. Enemy recovers 1 point of lost posture.

4. **Posture / Stagger Break & Extra Player Turn:**
   * Each enemy possesses a **Posture Threshold** (Skeletons: 1; Werewolves / Cannibals / Dark Knights: 2; Bosses: 3).
   * When an enemy's posture threshold is reached from consecutive fully-parried turns:
     * **POSTURE BROKEN!** The enemy is stunned.
     * The enemy's upcoming turn is skipped.
     * **The Player is awarded an Extra Turn / Action** (`playerActionsRemaining: 2`).
     * The player can execute two full combat arts or attacks during their turn before control returns to the opponent.

---

## 4. Art, Atmosphere & UI Philosophy

### 4.1 "Never Lean into the Ubisoft Style of UI"
* **Atmosphere First:** The aesthetic of *City of Hithair* is dark fantasy, gothic dread, and ruin. The environment, audio cues, and character portraits must carry the emotional weight—not garish UI clutter.
* **No UI Bloat:**
  * Avoid floating GPS markers, giant floating icons, neon mini-map clutter, or tutorial text taking over the screen.
  * Avoid loud, modern arcade popups.
  * Use diegetic or localized feedback: the circular parry indicator lives directly on the hero as a protective barrier reticle rather than an omnipresent fullscreen popup.
* **Ambient Communication:**
  * Enemy intent is telegraphed through menacing dark fantasy battle barks (*"Werewolf prepares a Vicious Maul"*).
  * Audio cues (sword clashes, dark whispers, monster roars, ambient dungeon drone) signal changes in state.
* **Rule on Ambiguity:**
  * If a gameplay state needs to be conveyed and the atmosphere/ambiance alone does not provide sufficient clarity, **do not guess or clutter the screen**—consult directly with the designer to determine the most organic way to communicate it.

---

## 5. Travel & Dungeon Navigation System

* **City of Hithair as the Hub:**
  * Players should have a direct way to view and travel to any unlocked dungeon floor without having to walk through cleared empty rooms.
* **Deepest Floor Access:**
  * Upon clearing a dungeon (e.g. Cemetery), the next dungeon (Mausoleum) is unlocked permanently on the hub travel board.
  * Returning to Hithair to buy supplies from the merchant should allow direct return to the deepest unlocked floor.

---

## 6. UI Aesthetic System: "Dark Iron Relic" (Darkest Dungeon Ironforge)

* **Style Identifier / Call Name:** `Dark Iron Relic` (or `dark-iron-relic`)
* **Inspiration:** Darkest Dungeon gothic ironwork, medieval blacksmith forging, antique reliquary plates.

Whenever the user requests the **Dark Iron Relic** style for any panel, component, or menu, adhere to these guidelines:

### 6.1 Core Visual Tokens

1. **Forged Iron Backdrop & Plates:**
   * **Base Background:** Deep stone-to-obsidian gradient: `bg-gradient-to-b from-stone-900/90 via-stone-950/95 to-stone-950`
   * **Borders & Inset Shadow:** `border border-stone-800/90 shadow-[inset_0_1px_3px_rgba(255,255,255,0.06),0_6px_16px_rgba(0,0,0,0.7)]`
   * **Rounded Edges:** Subtly rounded corners (`rounded-lg` or `rounded-xl`) reflecting hand-hammered iron bevels.

2. **Corner Brackets & Rivet Studs:**
   * Heavy iron plates are "bolted" at the corners. In all 4 corners, place small angular brackets with centered metallic rivets:
     ```tsx
     {/* Top-Left Bracket & Rivet */}
     <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-stone-600/70 pointer-events-none" />
     <div className="absolute top-1.5 left-1.5 w-1 h-1 rounded-full bg-stone-400 border border-stone-900 shadow-sm pointer-events-none" />
     ```

3. **Engraved Dividers & Section Banners:**
   * Instead of plain borders or loud cards, divide sections using tapered iron seams with a 45-degree diamond center pip and tracking-widest Cinzel headers:
     ```tsx
     <div className="flex items-center gap-2 w-full px-2">
       <div className="h-px flex-1 bg-gradient-to-r from-transparent via-stone-700/80 to-transparent" />
       <div className="flex items-center gap-1.5">
         <div className="w-1.5 h-1.5 rotate-45 bg-stone-600" />
         <span className="text-[10px] font-cinzel font-bold tracking-widest uppercase text-stone-400">
           {SectionTitle}
         </span>
         <div className="w-1.5 h-1.5 rotate-45 bg-stone-600" />
       </div>
       <div className="h-px flex-1 bg-gradient-to-r from-transparent via-stone-700/80 to-transparent" />
     </div>
     ```

4. **Recessed Slotted Bays:**
   * Buttons, attribute values, and inventory items sit in recessed carved slots:
     `bg-stone-950/70 border border-stone-800/80 rounded shadow-inner`
   * Icons are enclosed in small beveled iron housings:
     `w-5 h-5 bg-stone-900 border border-stone-700/60 rounded p-0.5 shadow-sm`

5. **Hierarchical Focal Principle (The Medallion Rule):**
   * **The Central Relic (`MedallionPortrait`):** Holds the primary visual majesty—it alone possesses the circular iron frame, curved arc gauges, and static hanging chains/charms below.
   * **Adjacent Panels (`UnitCombatStats`, `UnitActionBar`, Menu Panels):** Must use the matching dark-iron plates, corner rivets, and engraved dividers, but **NEVER include hanging medallions or chains**, so the focal portrait retains undivided visual attention.
