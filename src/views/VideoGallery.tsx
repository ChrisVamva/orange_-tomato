import { useEffect } from 'react';

interface VideoGalleryProps {
  isDarkMode: boolean;
}

interface GalleryVideo {
  id: string;
  title: string;
  caption: string;
  src: string;
}

const VIDEOS: GalleryVideo[] = [
  {
    id: 'the-arrival-of-orange-tomato',
    title: 'The Arrival of Orange Tomato',
    caption: 'The film that opened the front page.',
    src: '/Video/The%20arrival%20of%20Orange%20Tomato.mp4',
  },
  {
    id: 'orange-tomato-platform-game',
    title: 'Orange Tomato: The Platform Game',
    caption: 'Footage from the Orange Tomato platform game.',
    src: '/Video/Orange_Tomato_platform_game_video_3cfd1ac8.mp4',
  },
  {
    id: 'ritual-awakening',
    title: 'Ritual Awakening',
    caption: 'The ritual that brought the Orange Tomato mascot to life.',
    src: '/Video/Ritual-Awakening.mp4',
  },
];

export const VideoGallery = ({ isDarkMode }: VideoGalleryProps) => {
  useEffect(() => {
    document.title = 'Video Gallery | Orange Tomato';
    const metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Video Gallery — the films and game footage of Orange Tomato.';
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-8 py-16">
      <h1 className="text-4xl sm:text-5xl font-black tracking-tight uppercase italic text-orange-500 dark:text-orange-400 mb-12">
        Video Gallery
      </h1>
      <p className={`mb-12 text-lg leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
        The films and game footage of Orange Tomato.
      </p>
      <ul className="divide-y-2 divide-black dark:divide-orange-500 border-y-2 border-black dark:border-orange-500">
        {VIDEOS.map((video) => (
          <li key={video.id} className="py-8" id={video.id}>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug text-black dark:text-white">
              {video.title}
            </h2>
            <p className="mt-2 text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              {video.caption}
            </p>
            <video
              className="mt-5 aspect-video w-full bg-black object-contain border-4 border-black dark:border-orange-500"
              src={video.src}
              controls
              playsInline
              preload="metadata"
              aria-label={video.title}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
