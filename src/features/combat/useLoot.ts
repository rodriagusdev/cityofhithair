import { itemIcons } from '../../data/stats';
import { getLevelDefinition } from '../../data/levels';
import {
  useAnnouncerStore,
  useDialogStore,
  useLevelsStore,
  usePlayerStore,
} from '../../stores';

export const useLoot = () => {
  const { updateNoteStatus, updateNote } = useDialogStore();
  const { updateLevelsCompletion } = useLevelsStore();
  const { updateGold, updateInventory, updatePotion } = usePlayerStore();
  const { handleAnnouncer, updateLoot } = useAnnouncerStore();

  const handleLoot = (enemyLevel: string) => {
    updateLevelsCompletion(enemyLevel);
    handleAnnouncer();

    const levelDef = getLevelDefinition(enemyLevel);
    if (!levelDef?.loot) return;

    const { loot } = levelDef;

    if (loot.gold) {
      updateGold(loot.gold);
    }
    if (loot.healthPotions) {
      updatePotion('healthPotions', loot.healthPotions);
    }
    if (loot.manaPotions) {
      updatePotion('manaPotions', loot.manaPotions);
    }
    if (loot.lootItems) {
      updateLoot(loot.lootItems);
    }
    if (loot.notes && loot.notes.length > 0) {
      const noteItems = loot.notes.map((note) => ({
        name: note.id,
        image: itemIcons.note,
        cost: 0,
        description: '',
        fn: () => {
          updateNoteStatus();
          updateNote({
            name: note.title,
            text: note.text,
          });
        },
      }));
      updateInventory(noteItems);
    }
  };

  return { handleLoot };
};

export default useLoot;
