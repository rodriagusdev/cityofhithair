import { useDialogStore } from '../../stores';

const Note = () => {
  const note = useDialogStore((state) => state.note);
  const { updateNoteStatus } = useDialogStore();

  return (
    <div className="flex flex-col gap-4 p-6 bg-stone-950/95 backdrop-blur-md border-2 border-stone-800 rounded-xl shadow-2xl max-w-md w-full text-stone-200">
      <div className="border-b border-stone-800 pb-2">
        <h2 className="font-display text-lg md:text-xl font-bold tracking-widest text-amber-200 uppercase text-center drop-shadow">
          {note.name}
        </h2>
      </div>

      <div className="p-4 bg-stone-900/90 border border-stone-800 rounded-lg text-base text-stone-200 font-body leading-relaxed italic shadow-inner whitespace-pre-line">
        <p>{note.text}</p>
      </div>

      <button
        type="button"
        onClick={updateNoteStatus}
        className="mt-2 w-full py-2 px-4 font-cinzel text-xs tracking-widest font-bold uppercase text-stone-300 bg-stone-900 hover:bg-red-950 hover:text-white border border-stone-700 hover:border-red-800 rounded-md transition-all cursor-pointer shadow-sm text-center"
      >
        Close Manuscript
      </button>
    </div>
  );
};

export default Note;
