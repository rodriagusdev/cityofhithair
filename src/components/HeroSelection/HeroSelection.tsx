import SelectHeroName from '../SelectHeroName/SelectHeroName';
import { animated } from '@react-spring/web';
import { heroPortraits } from '../../data/general';
import { Centerer } from '../Centerer';
import { wizardStats, knightStats } from '../../data/stats';
import { SkillPreview } from '../SkillPreview';
import HeroCard from './HeroCard';
import { useHeroSelection } from './useHeroSelection';

const HeroSelection = () => {
  const { selectNameIsVisible, isPreviewVisible, animationProps, getSelected } =
    useHeroSelection();

  return (
    <animated.div
      style={animationProps}
      className="relative flex flex-col items-center justify-center min-h-screen w-full px-4 py-8 sm:px-6 lg:px-8 bg-stone-950 text-stone-100 overflow-x-hidden selection:bg-amber-900 selection:text-white"
    >
      {/* Ambient Gothic Background Accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-950/15 rounded-full blur-3xl pointer-events-none -z-0" />

      {selectNameIsVisible && (
        <Centerer>
          <div className="p-6 bg-stone-950/95 border border-stone-700/80 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.9)] max-w-sm w-full mx-4">
            <SelectHeroName />
          </div>
        </Centerer>
      )}

      {isPreviewVisible && (
        <Centerer>
          <SkillPreview />
        </Centerer>
      )}

      <div className="relative z-10 flex flex-col items-center gap-6 lg:gap-8 w-full max-w-5xl xl:max-w-6xl mx-auto">
        {/* Minimalist Title Section */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h1 className="font-display text-md sm:text-4xl font-bold tracking-[0.25em] w-full uppercase text-red-600 block drop-shadow-[0_2px_15px_rgba(220,38,38,0.4)]">
            Descent into Hithair
          </h1>
        </div>

        {/* 2-Column Responsive Widescreen Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 w-full">
          {/* Knight Card */}
          <HeroCard
            id="knight"
            name="Knight"
            roleBadge=""
            tagline="Melee Vanguard"
            description="A knight from Nitali, city where Gwindolyn Human-Daughter was born. The knights of Nitali evade the curse of human link to the creator."
            portrait={heroPortraits.knight}
            health={65}
            attack={11}
            defense={5}
            spiritualPower={2}
            skills={knightStats.skills}
            theme="knight"
            onSelect={() => getSelected('knight')}
          />

          {/* Dark Mage Card */}
          <HeroCard
            id="darkmage"
            name="Dark Sorcerer"
            roleBadge=""
            tagline="Arcane Occultist"
            description="A dark sorcerer from a land unknown and motives unclear."
            portrait={heroPortraits.darkmage}
            health={47}
            attack={5}
            defense={1}
            spiritualPower={8}
            darkMastery={2}
            skills={wizardStats.skills}
            theme="darkmage"
            onSelect={() => getSelected('darkmage')}
          />
        </div>
      </div>
    </animated.div>
  );
};

export default HeroSelection;
