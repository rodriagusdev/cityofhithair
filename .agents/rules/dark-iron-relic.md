# Rule: Dark Iron Relic UI Style ("dark-iron-relic")

When the user asks to style a UI component using **"Dark Iron Relic"** or **"Darkest Dungeon Ironforge"** style:

## 1. Aesthetic Definition
- **Materials:** Deep gothic stone-to-obsidian gradient (`bg-gradient-to-b from-stone-900/90 via-stone-950/95 to-stone-950`), dark-iron borders (`border border-stone-800/90`), deep inset shadows (`shadow-[inset_0_1px_3px_rgba(255,255,255,0.06),0_6px_16px_rgba(0,0,0,0.7)]`).
- **Corner Brackets & Rivets:** Place small angular iron brackets and metallic rivet studs in all 4 corners (`w-1 h-1 rounded-full bg-stone-400 border border-stone-900 shadow-sm`).
- **Engraved Section Dividers:** Divide trays or sections using a tapered iron seam (`bg-gradient-to-r from-transparent via-stone-700/80 to-transparent`), a centered 45° diamond pip (`w-1.5 h-1.5 rotate-45 bg-stone-600`), and Cinzel uppercase tracking-widest text (`font-cinzel text-[10px] font-bold tracking-widest text-stone-400 uppercase`).
- **Recessed Bays:** Attribute slots and skill icons sit in recessed carved bays (`bg-stone-950/70 border border-stone-800/80 rounded shadow-inner`).
- **Visual Hierarchy (Medallion Focal Rule):**
  - Only the central `MedallionPortrait` features circular gauges and hanging chains/charms below.
  - Surrounding panels and action decks adopt the dark-iron framing and rivets, but must NEVER include clinging medallions or hanging chains, ensuring the portrait remains the singular centerpiece.
