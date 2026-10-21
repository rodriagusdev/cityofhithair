import { useBattleStore } from '../../../stores';
import { Player, Unit } from '../../../types';
import { useBattleHandler } from '../../../features/combat';

interface Props {
  unit: Player | Unit;
}

export const useBoardUnit = ({ unit }: Props) => {
  const { handleActionOnEnemy } = useBattleHandler();
  const currentAction = useBattleStore((state) => state.action);
  const turn = useBattleStore((state) => state.turn);
  const isEnemy = (unit as Player).player === undefined;
  const isPlayerTurn = isEnemy && turn === 'Player';

  const handleOnClick = () => {
    if (isPlayerTurn) {
      handleActionOnEnemy(currentAction || 'Attack');
    }
  };

  return { handleOnClick, isEnemy };
};

export default useBoardUnit;
