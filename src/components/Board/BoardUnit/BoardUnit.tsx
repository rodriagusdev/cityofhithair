import React from 'react';
import { useBoardUnit } from './useBoardUnit';
import { Player, Unit } from '../../../types';
import UnitPortrait from './UnitPortrait';
import UnitCombatStats from './UnitCombatStats';
import UnitActionBar from './UnitActionBar';

interface Props {
  unit: Player | Unit;
  className?: string;
}

const BoardUnit: React.FC<Props> = ({ unit, className = '' }) => {
  const { handleOnClick, isEnemy } = useBoardUnit({ unit });

  return (
    <div
      className={`flex flex-col items-center mt-70 transition-all w-full ${className}`}
    >
      {/* Unit Battlefield Sprite & Vitals */}
      <UnitPortrait unit={unit} isEnemy={isEnemy} onPortraitClick={handleOnClick} />
    </div>
  );
};

export default BoardUnit;
