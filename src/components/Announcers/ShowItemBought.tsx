import { useAnnouncerStore } from '../../stores';

const ShowItemBought = () => {
  const text = useAnnouncerStore((state) => state.announcerText);
  const { handleAnnouncer } = useAnnouncerStore();

  return (
    <div className="flex flex-col items-center gap-3 p-5 bg-stone-950/95 backdrop-blur-md border-2 border-stone-800 rounded-xl shadow-2xl max-w-sm w-full mx-auto text-stone-100 font-cinzel text-center">
      <p className="text-sm font-semibold tracking-wide text-white">
        {text}
      </p>

      <button
        type="button"
        onClick={handleAnnouncer}
        className="w-full mt-2 py-1.5 px-3 text-xs tracking-wider font-bold uppercase text-stone-100 bg-red-950/90 hover:bg-red-900 hover:text-white border border-red-900/80 hover:border-red-700 rounded transition-colors shadow cursor-pointer text-center"
      >
        Acknowledge
      </button>
    </div>
  );
};

export default ShowItemBought;
