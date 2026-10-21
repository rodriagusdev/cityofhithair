import { useBattleHandler } from '../../features/combat';
import {
  useAnnouncerStore,
  useBattleStore,
  usePlayerStore,
} from '../../stores';

const ShowFireSkillQuestion = () => {
  const { handleSkillQuestion } = useAnnouncerStore();
  const { handleActionOnEnemy } = useBattleHandler();
  const selectedSkill = usePlayerStore((state) => state.selectedSkill);
  const isInFight = useBattleStore((state) => state.isInFight);

  const triggerskill = () => {
    if (isInFight) {
      handleSkillQuestion();
      handleActionOnEnemy(selectedSkill.name);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 p-5 bg-stone-950/95 backdrop-blur-md border-2 border-stone-800 rounded-xl shadow-2xl max-w-sm w-full mx-auto text-stone-100 font-cinzel text-center">
      <p className="text-sm font-semibold tracking-wide text-white">
        Cast {selectedSkill.name} upon yourself?
      </p>

      <img
        src={selectedSkill.image}
        alt={selectedSkill.name}
        className="w-12 h-12 object-contain p-1.5 bg-stone-900 border border-stone-700 rounded-lg shadow"
      />

      <div className="flex gap-3 w-full mt-2">
        <button
          type="button"
          onClick={triggerskill}
          className="flex-1 py-1.5 px-3 text-xs tracking-wider font-bold uppercase text-stone-100 bg-red-950/90 hover:bg-red-900 hover:text-white border border-red-900/80 hover:border-red-700 rounded transition-colors shadow cursor-pointer text-center"
        >
          Confirm
        </button>
        <button
          type="button"
          onClick={handleSkillQuestion}
          className="flex-1 py-1.5 px-3 text-xs tracking-wider font-semibold uppercase text-stone-400 hover:text-stone-200 bg-stone-900 hover:bg-stone-850 rounded border border-stone-700 transition-colors cursor-pointer text-center"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ShowFireSkillQuestion;
