import { useEffect, useRef, useState } from 'react';

const AUDIO_SRC = '/Music/How%20Did%20We%20Become.mp3';
const ICON_SRC = '/Music/Mascot%20and%20Huntress%20Music%20Pickup%20Player.webp';

export const MusicPlayerButton = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, []);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }
    void audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  };

  return (
    <>
      <audio ref={audioRef} src={AUDIO_SRC} preload="none" />
      <button
        type="button"
        onClick={togglePlayback}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? "Pause 'How Did We Become'" : "Play 'How Did We Become'"}
        title={isPlaying ? "Pause 'How Did We Become'" : "Play 'How Did We Become' — the Orange Tomato song"}
        className={`shrink-0 border-4 border-black dark:border-orange-500 bg-white transition-all transform hover:scale-110 ${
          isPlaying ? 'ring-4 ring-orange-500' : ''
        }`}
      >
        <img
          src={ICON_SRC}
          alt=""
          className="block h-9 w-9 sm:h-11 sm:w-11 object-cover"
          width={1600}
          height={1600}
        />
      </button>
    </>
  );
};
