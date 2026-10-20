import { useAnnouncerStore } from '../../stores';

const ItemPreview = () => {
  const { handleItemPreview } = useAnnouncerStore();
  const item = useAnnouncerStore((state) => state.itemPreviewInfo);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-stone-950/95 backdrop-blur-md border-2 border-stone-800 rounded-xl shadow-2xl max-w-lg w-full text-stone-200">
      <div className="flex flex-col items-center gap-2 min-w-[120px]">
        <img
          src={item.image}
          alt={item.name}
          className="w-16 h-16 object-contain p-2 bg-stone-900 border border-stone-700 rounded-lg shadow"
        />
        <span className="font-cinzel text-xs font-semibold text-stone-200">
          {item.cost} Gold
        </span>
        <div className="flex flex-col gap-1 w-full mt-2">
          <button
            type="button"
            onClick={item.fn}
            className="w-full py-1.5 px-3 font-cinzel text-xs tracking-wider font-bold uppercase text-stone-100 bg-red-950/90 hover:bg-red-900 hover:text-white border border-red-900/80 hover:border-red-700 rounded transition-colors shadow cursor-pointer text-center"
          >
            Buy
          </button>
          <button
            type="button"
            onClick={() => handleItemPreview()}
            className="w-full py-1 px-3 font-cinzel text-xs tracking-wider text-stone-400 hover:text-stone-200 bg-stone-900 hover:bg-stone-800 rounded transition-colors border border-stone-700 cursor-pointer text-center"
          >
            Close
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 text-left">
        <h2 className="font-cinzel text-lg font-bold tracking-wider text-white uppercase border-b border-stone-800 pb-1">
          {item.name}
        </h2>
        <p className="font-cinzel text-xs md:text-sm text-stone-300 leading-relaxed italic">
          {item.description}
        </p>
      </div>
    </div>
  );
};

export default ItemPreview;
