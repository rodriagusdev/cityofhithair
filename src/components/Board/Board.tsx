import { ShowBattleAction } from '../Announcers';
import { useAnnouncerStore, useBattleStore } from '../../stores';
import { BoardUnit } from './BoardUnit';
import { Centerer } from '../Centerer';
import { SkillPreview } from '../SkillPreview';
import ShowFireSkillQuestion from '../Announcers/ShowFireSkillQuestion';
import combatBg from '../../assets/backgroundcombat.jpg';

const Board = () => {
  const currentEnemy = useBattleStore((state) => state.boardEnemy);
  const currentHero = useBattleStore((state) => state.boardPlayer);
  const isInFight = useBattleStore((state) => state.isInFight);
  const isPreviewVisible = useAnnouncerStore((state) => state.isPreviewVisible);
  const isSkillQuestion = useAnnouncerStore((state) => state.isSkillQuestion);
  const isAnnouncerVisible = useAnnouncerStore(
    (state) => state.isAnnouncerVisible
  );
  const phase = useBattleStore((state) => state.phase);
  const turn = useBattleStore((state) => state.turn);
  const action = useBattleStore((state) => state.action);

  const isSelfCast =
    (turn === 'Player' &&
      (action === 'Defend' ||
        action === 'Frenzy' ||
        action.startsWith('Potion'))) ||
    (turn === 'Enemy' && (action === 'Defend' || action === 'Frenzy'));

  const isHeroAttacking = phase === 'resolving' && turn === 'Player' && !isSelfCast;
  const isEnemyAttacking = phase === 'enemy_turn' && turn === 'Enemy' && !isSelfCast;
  const isClashActive = isHeroAttacking || isEnemyAttacking;

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-center w-screen min-h-screen h-full gap-8 md:gap-24 lg:gap-36 p-6 overflow-x-hidden bg-stone-950 select-none">
      {/* Cinematic Camera Background with Darkest Dungeon Zoom & Impact Punch */}
      <div
        className={`absolute inset-0 bg-cover bg-center pointer-events-none transition-transform duration-500 ease-out ${
          isClashActive ? 'scale-105 animate-camera-punch' : 'scale-100'
        }`}
        style={{ backgroundImage: `url(${combatBg})` }}
      />

      {/* Dark gothic atmospheric overlay */}
      <div className="absolute inset-0 bg-stone-950/60 backdrop-brightness-75 pointer-events-none" />

      {/* Darkest Dungeon Dramatic Spotlight & Vignette during combat clash */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 z-15 ${
          isClashActive
            ? 'opacity-100 bg-[radial-gradient(ellipse_at_50%_35%,rgba(255,255,255,0.14)_0%,rgba(10,8,12,0.85)_48%,rgba(0,0,0,0.98)_90%)]'
            : 'opacity-0'
        }`}
      />

      {/* Hero Unit Container (Attacker elevated to z-30 during strike) */}
      <div
        className={`relative transition-all duration-300 flex-1 w-full ${
          isHeroAttacking ? 'z-30' : isEnemyAttacking ? 'z-20' : 'z-10'
        }`}
      >
        <BoardUnit unit={currentHero} />
      </div>

      {/* Enemy Unit Container (Attacker elevated to z-30 during strike) */}
      <div
        className={`relative transition-all duration-300 flex-1 w-full ${
          isEnemyAttacking ? 'z-30' : isHeroAttacking ? 'z-20' : 'z-10'
        }`}
      >
        <BoardUnit unit={currentEnemy} />
      </div>

      {/* Non-intrusive floating battle banner (replaces blocking center modal) */}
      {isInFight && isAnnouncerVisible && phase !== 'enemy_telegraph' && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-40 pointer-events-none transition-all duration-300">
          <ShowBattleAction />
        </div>
      )}

      {isPreviewVisible && (
        <Centerer>
          <SkillPreview />
        </Centerer>
      )}
    </div>
  );
};

export default Board;
