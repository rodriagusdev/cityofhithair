import { useCombat } from '../../combat';

export const useBattleHandler = () => {
  const { executePlayerAction } = useCombat();

  const handleActionOnEnemy = (action: string) => {
    executePlayerAction(action);
  };

  return { handleActionOnEnemy };
};

export default useBattleHandler;
