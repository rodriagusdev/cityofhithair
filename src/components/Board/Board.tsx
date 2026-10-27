import { ShowBattleAction } from '../Announcers';
import { useAnnouncerStore, useBattleStore } from '../../stores';
import { BoardUnit } from './BoardUnit';
import { CombatTopHUD } from './CombatTopHUD';
import { PlayerCommandDeck } from './PlayerCommandDeck';
import { Centerer } from '../Centerer';
import { SkillPreview } from '../SkillPreview';
import { AtmosphereParticles } from '../Atmosphere';
import ShowFireSkillQuestion from '../Announcers/ShowFireSkillQuestion';
import combatBg from '../../assets/levels/cemeteryfight.webp';

const Board = () => {
  const currentEnemy = useBattleStore((state) => state.boardEnemy);
  const currentHero = useBattleStore((state) => state.boardPlayer);
  const isInFight = useBattleStore((state) => state.isInFight);
  const screenShake = useBattleStore((state) => state.screenShake);
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
    <div
      className={`relative flex flex-col md:flex-row items-center justify-center w-full min-h-screen h-full gap-4 sm:gap-6 md:gap-6 lg:gap-8 xl:gap-14 2xl:gap-24 p-3 sm:p-4 md:p-5 lg:p-6 pt-24 sm:pt-28 md:pt-32 overflow-y-auto overflow-x-hidden bg-stone-950 select-none ${screenShake === 'deathblow'
        ? 'animate-screen-shake-heavy border'
        : screenShake === 'crit' || screenShake === 'heavy'
          ? 'animate-screen-shake'
          : ''
        }`}
    >
      {/* Top Gothic Battle HUD (Portraits, Pointed Bars, Status Orbs, Antique Clock) */}
      <CombatTopHUD />
      {/* Visual Impact Flashes */}
      {screenShake === 'deathblow' && (
        <div className="absolute inset-0 bg-red-900/35 z-50 pointer-events-none animate-impact-flash" />
      )}
      {screenShake === 'crit' && (
        <div className="absolute inset-0 bg-amber-500/15 z-50 pointer-events-none animate-impact-flash" />
      )}

      {/* Cinematic Camera Background with Darkest Dungeon Zoom & Impact Punch */}
      <div
        className={` absolute h-full inset-0 bg-cover bg-top pointer-events-none transition-transform duration-500 ease-out ${isClashActive ? 'scale-105 animate-camera-punch' : 'scale-100'
          }`}
        style={{ backgroundImage: `url(${combatBg})` }}
      />

      {/* Dark gothic atmospheric overlay */}
      <div className="absolute inset-0  backdrop-brightness-75 pointer-events-none" />



      {/* Darkest Dungeon Dramatic Spotlight & Vignette during combat clash */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 z-10 ${isClashActive
          ? 'opacity-100 bg-[radial-gradient(ellipse_at_50%_35%,rgba(255,255,255,0.14)_0%,rgba(10,8,12,0.85)_48%,rgba(0,0,0,0.98)_90%)]'
          : 'opacity-0 '
          }`}
      />

      {/* Hero Unit Container (Attacker elevated to z-30 during strike) */}
      <div
        className={`relative transition-all duration-300 flex-1 w-full flex items-center justify-center ${isHeroAttacking ? 'z-30' : isEnemyAttacking ? 'z-20' : 'z-10'
          }`}
      >
        <BoardUnit unit={currentHero} />
      </div>

      {/* Enemy Unit Container (Attacker elevated to z-30 during strike) */}
      <div
        className={`relative transition-all duration-300 flex-1 w-full flex items-center justify-center ${isEnemyAttacking ? 'z-30' : isHeroAttacking ? 'z-20' : 'z-10'
          }`}
      >
        <BoardUnit unit={currentEnemy} />
      </div>

      {/* Centered Bottom Player Command Deck (Attributes, Skills & Items) */}
      <PlayerCommandDeck />

      {/* Non-intrusive floating battle banner (replaces blocking center modal) */}
      {isInFight && isAnnouncerVisible && phase !== 'enemy_telegraph' && (
        <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 z-40 pointer-events-none transition-all duration-300 w-full px-4 flex justify-center">
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
