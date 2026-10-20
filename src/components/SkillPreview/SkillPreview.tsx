import { useAnnouncerStore } from '../../stores';

const SkillPreview = () => {
  const { handlePreview } = useAnnouncerStore();
  const skill = useAnnouncerStore((state) => state.skillPreviewInfo);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-stone-950/95 backdrop-blur-md border-2 border-stone-800 rounded-xl shadow-2xl max-w-lg w-full text-stone-200">
      <div className="flex flex-col items-center gap-2 min-w-[120px]">
        <img
          src={skill.image}
          alt={skill.name}
          className="w-16 h-16 object-contain p-2 bg-stone-900 border border-stone-700 rounded-lg shadow"
        />
        {skill.cost > 0 && (
          <span className="font-cinzel text-xs font-semibold text-cyan-400">
            SP Cost: {skill.cost}
          </span>
        )}
        <button
          type="button"
          onClick={() => handlePreview()}
          className="w-full mt-2 py-1 px-3 font-cinzel text-xs tracking-wider text-stone-400 hover:text-stone-200 bg-stone-900 hover:bg-stone-800 rounded transition-colors border border-stone-700 cursor-pointer text-center"
        >
          Close
        </button>
      </div>

      <div className="flex flex-col gap-2 text-left">
        <h2 className="font-cinzel text-lg font-bold tracking-wider text-white uppercase border-b border-stone-800 pb-1">
          {skill.name}
        </h2>
        <p className="font-cinzel text-xs md:text-sm text-stone-300 leading-relaxed italic">
          {skill.description}
        </p>
      </div>
    </div>
  );
};

export default SkillPreview;
