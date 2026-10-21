import { useSelectHeroName } from './useSelectHeroName';

const SelectHeroName = () => {
  const { handleOnChange, updateName } = useSelectHeroName();

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <h4 className="font-cinzel text-base md:text-lg font-bold tracking-wider text-white uppercase text-center drop-shadow">
        What is your name?
      </h4>

      <input
        className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded-md text-stone-100 placeholder-stone-500 focus:outline-none focus:border-red-700 font-cinzel text-center text-sm transition-colors"
        type="text"
        id="getName"
        name="getName"
        placeholder="Enter name..."
        onChange={handleOnChange}
        autoFocus
      />

      <button
        type="button"
        onClick={updateName}
        className="w-full py-2 px-4 font-cinzel text-xs tracking-widest font-bold uppercase text-stone-100 bg-red-950/90 hover:bg-red-900 hover:text-white border border-red-900/80 hover:border-red-700 rounded-md transition-colors shadow-md cursor-pointer text-center"
      >
        Confirm Name
      </button>
    </div>
  );
};

export default SelectHeroName;
