import { Note } from '../Note';
import { Centerer } from '../Centerer';
import { useDialogStore, usePlayerStore } from '../../stores';
import PlayerVitals from './PlayerVitals';
import PlayerStats from './PlayerStats';
import PlayerInventory from './PlayerInventory';

const PlayerUI = () => {
  const player = usePlayerStore((state) => state.player);
  const inventory = usePlayerStore((state) => state.inventory);
  const gold = usePlayerStore((state) => state.gold);
  const isInNote = useDialogStore((state) => state.isInNote);

  return (
    <div className="flex flex-col items-center gap-2 w-full shrink-0 p-2.5 bg-stone-950/85 backdrop-blur-md border border-stone-800 rounded-lg shadow-xl text-stone-200">
      {isInNote && (
        <Centerer>
          <Note />
        </Centerer>
      )}

      {/* Hero Vitals & Portrait */}
      <PlayerVitals player={player} />

      {/* Core Attributes */}
      <PlayerStats player={player} gold={gold} />

      {/* Equipment & Pouch */}
      <PlayerInventory inventory={inventory} />
    </div>
  );
};

export default PlayerUI;
