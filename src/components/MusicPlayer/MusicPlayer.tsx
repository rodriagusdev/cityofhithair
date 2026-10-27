import { useMusicPlayer } from './useMusicPlayer';

interface Props {
  track: string;
}

const MusicPlayer = ({ track }: Props) => {
  const { musicIsPlaying, handleOnClick } = useMusicPlayer({ track });

  return (
    <div className="fixed top-3 left-3 z-20">
      <button
        onClick={handleOnClick}
        type="button"
        title={musicIsPlaying ? 'Mute Atmosphere' : 'Unmute Atmosphere'}
        aria-label={musicIsPlaying ? 'Mute Music' : 'Unmute Music'}
        className="flex items-center justify-center p-2 rounded-full bg-stone-950/90 hover:bg-stone-900 border border-red-950 hover:border-red-700 text-red-600 hover:text-red-500 transition-all shadow-lg cursor-pointer"
      >
        {musicIsPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M15.35 20.3q-.5.2-.925-.125q-.425-.325-.425-.9q0-.275.163-.487q.162-.213.412-.313q2-.8 3.213-2.55Q19 14.175 19 11.975t-1.212-3.95q-1.213-1.75-3.213-2.55q-.275-.1-.425-.325q-.15-.225-.15-.5q0-.55.425-.875q.425-.325.925-.125q2.55 1.025 4.1 3.275Q21 9.175 21 11.975t-1.55 5.05q-1.55 2.25-4.1 3.275ZM4 15q-.425 0-.712-.288Q3 14.425 3 14v-4q0-.425.288-.713Q3.575 9 4 9h3l3.3-3.3q.475-.475 1.087-.213q.613.263.613.938v11.15q0 .675-.613.937q-.612.263-1.087-.212L7 15Zm10 1V7.95q1.125.525 1.812 1.625q.688 1.1.688 2.425q0 1.325-.688 2.4Q15.125 15.475 14 16Z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27L7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21L21 19.73l-9-9L4.27 3zM12 4L9.91 6.09L12 8.18V4z"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default MusicPlayer;
