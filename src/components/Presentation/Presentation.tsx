import { useState } from 'react';
import { useTransition, animated, useSpring } from '@react-spring/web';

const presentationText =
  "The townfolk of Hithair requested help to the city of Kimvaema in the west. After a few denials, they came to us. They claim an ancient evil has been unleashed again, that its awakening made the bestial dark knights more aggressive, but it couldn't be further from the truth. Ignore them. Since their great hero Tamoé fell, they became deranged and fearful. This evil will never go out, but your target will.\n\nA man named Nicolai entered Hithair in search of something he concealed to himself, he was seen here in Balfiera also. After a while, the defenders in the mausoleum were swarmed by hordes of skeletons and dark knights led by an entity called The Cannibal. Of Nicolai nothing else is heard yet, but the survivors tell of a 'hole' in the mausoleum that leads to forgotten dungeons. Somehow, Nicolai passed unseen and opened this dark passage that was known only to him. This is his work, not of an ancient evil. You must get information of this man at all costs. We fear he might come one day to Balfiera. Confrontation is not needed. You must survive and get clues of the man's whereabouts. Hithair is not a priority.";

interface Props {
  setPresentation: React.Dispatch<React.SetStateAction<boolean>>;
}

const Presentation = ({ setPresentation }: Props) => {
  const [visible, setVisible] = useState(true);
  const transition = useTransition(visible, {
    from: { opacity: 1 },
    enter: { opacity: 1 },
    leave: { opacity: 0, config: { duration: 1500 } },
  });

  const animationProps = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  const closePresentation = () => {
    setVisible(false);
    setTimeout(() => {
      setPresentation(false);
    }, 1500);
  };

  return (
    <>
      {transition(
        (style, item) =>
          item && (
            <animated.div
              style={style}
              className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-stone-950/98 backdrop-blur-md overflow-y-auto"
            >
              <animated.div
                style={animationProps}
                className="flex flex-col gap-6 max-w-2xl w-full p-8 bg-stone-900/90 border-2 border-stone-800 rounded-xl shadow-2xl text-left"
              >
                <div className="border-b border-stone-800 pb-2">
                  <h2 className="font-cinzel text-xl md:text-2xl font-bold tracking-widest text-white uppercase drop-shadow">
                    Order of Dispatch
                  </h2>
                  <span className="font-cinzel text-xs text-stone-500 tracking-wider">
                    Balfiera Courier Transmission
                  </span>
                </div>

                <p className="font-cinzel text-xs md:text-sm text-stone-300 leading-relaxed whitespace-pre-line tracking-wide">
                  {presentationText}
                </p>

                {visible && (
                  <button
                    type="button"
                    onClick={closePresentation}
                    className="self-center mt-2 px-8 py-2.5 font-cinzel text-xs tracking-widest font-bold uppercase text-stone-100 bg-red-950/90 hover:bg-red-900 hover:text-white border border-red-900/80 hover:border-red-700 rounded-md transition-all shadow-md cursor-pointer"
                  >
                    Enter Hithair
                  </button>
                )}
              </animated.div>
            </animated.div>
          )
      )}
    </>
  );
};

export default Presentation;
