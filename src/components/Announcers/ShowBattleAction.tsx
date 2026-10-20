import { useAnnouncerStore } from '../../stores';

const ShowBattleAction = () => {
  const action = useAnnouncerStore((state) => state.announcerAction);

  return (
    <div className="flex items-center justify-center gap-3 py-2 px-4 bg-stone-950/90 backdrop-blur-md border border-stone-800 rounded-full shadow-2xl max-w-md mx-auto text-stone-100 font-cinzel">
      {action.attackerImg && (
        <img
          src={action.attackerImg}
          alt="Attacker"
          className="w-8 h-8 object-cover rounded-full border border-stone-700 bg-stone-900 shadow shrink-0"
        />
      )}

      <div className="flex items-center text-center gap-2">
        <p className="text-xs md:text-sm font-semibold tracking-wider text-white">
          {action.text}
        </p>
        {action.skillIcon && (
          <img
            src={action.skillIcon}
            alt="Skill"
            className="w-5 h-5 object-contain p-0.5 bg-stone-900 border border-stone-700 rounded shadow shrink-0"
          />
        )}
      </div>

      {action.receiverImg && action.receiverImg !== action.attackerImg && (
        <img
          src={action.receiverImg}
          alt="Receiver"
          className="w-8 h-8 object-cover rounded-full border border-stone-700 bg-stone-900 shadow shrink-0"
        />
      )}
    </div>
  );
};

export default ShowBattleAction;
