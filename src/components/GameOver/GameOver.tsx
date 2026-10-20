const GameOver = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-stone-950/95 backdrop-blur-md text-stone-100 p-6 animate-fade-in">
      <div className="flex flex-col items-center gap-6 max-w-md text-center">
        <h1 className="font-cinzel text-3xl md:text-5xl font-extrabold tracking-widest text-rose-700 uppercase drop-shadow-[0_4px_12px_rgba(190,18,60,0.6)]">
          You Are Dead
        </h1>
        <p className="font-cinzel text-sm text-stone-400 tracking-wider leading-relaxed">
          Your flesh withers. Your soul is absorbed into the damp stones of Hithair.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2.5 font-cinzel text-xs tracking-widest font-bold uppercase text-stone-100 bg-red-950/90 hover:bg-red-900 hover:text-white border border-red-900/80 hover:border-red-700 rounded-md transition-all shadow-lg cursor-pointer"
        >
          Rise Again
        </button>
      </div>
    </div>
  );
};

export default GameOver;
