import { useTransition, animated } from '@react-spring/web';

interface Props {
  visible: boolean;
}

const Victory = ({ visible }: Props) => {
  const transition = useTransition(visible, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 1, config: { duration: 1500 } },
  });

  return (
    <>
      {transition(
        (style, item) =>
          item && (
            <animated.div
              style={style}
              className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-stone-950/98 backdrop-blur-md"
            >
              <div className="flex flex-col items-center gap-6 max-w-lg text-center p-8 bg-stone-900/90 border-2 border-stone-800 rounded-xl shadow-2xl">
                <h1 className="font-cinzel text-2xl md:text-4xl font-extrabold tracking-widest text-purple-400 uppercase drop-shadow">
                  Vessel Claimed
                </h1>
                <p className="font-cinzel text-sm md:text-base text-stone-300 tracking-wider leading-relaxed whitespace-pre-line">
                  Your body has been trapped in the dark depths. You belong to Nicolai now.
                </p>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="mt-4 px-6 py-2.5 font-cinzel text-xs tracking-widest font-bold uppercase text-stone-100 bg-red-950/90 hover:bg-red-900 hover:text-white border border-red-900/80 hover:border-red-700 rounded-md transition-all shadow-md cursor-pointer"
                >
                  Restart Journey
                </button>
              </div>
            </animated.div>
          )
      )}
    </>
  );
};

export default Victory;
