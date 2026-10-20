import { useAnnouncerStore, useBattleStore } from '../../stores';
import { Centerer } from '../Centerer';

interface Props {
  text: string;
}

const ShowLoot = ({ text }: Props) => {
  const { handleAnnouncer } = useAnnouncerStore();
  const getLoot = useAnnouncerStore((state) => state.loot);
  const isVisible = useAnnouncerStore((state) => state.isAnnouncerVisible);
  const isInFight = useBattleStore((state) => state.isInFight);

  const handleOnExit = () => {
    handleAnnouncer();
  };

  return (
    <>
      {isVisible && !isInFight && (
        <Centerer>
          <div className="flex flex-col items-center gap-4 p-6 bg-stone-950/95 backdrop-blur-md border-2 border-stone-800 rounded-xl shadow-2xl max-w-sm w-full mx-auto text-stone-100 font-cinzel text-center">
            <h3 className="text-base font-bold tracking-widest text-white uppercase drop-shadow">
              {text}
            </h3>

            <div className="flex flex-wrap items-center justify-center gap-4 p-3 bg-stone-900/80 border border-stone-800 rounded-lg w-full">
              {getLoot.map((loot, index) => (
                <div key={index} className="flex flex-col items-center gap-1">
                  <img
                    src={loot.image}
                    alt={loot.name}
                    className="w-12 h-12 object-contain p-1.5 bg-stone-950 border border-stone-700 rounded-lg shadow"
                  />
                  <p className="text-xs text-stone-300 font-semibold">{loot.name}</p>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleOnExit}
              className="w-full mt-1 py-1.5 px-3 text-xs tracking-wider font-bold uppercase text-stone-100 bg-red-950/90 hover:bg-red-900 hover:text-white border border-red-900/80 hover:border-red-700 rounded transition-colors shadow cursor-pointer text-center"
            >
              Collect Loot
            </button>
          </div>
        </Centerer>
      )}
    </>
  );
};

export default ShowLoot;
