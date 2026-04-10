import React from 'react';
import { ProjectMedia } from '../../types/projects';

interface MediaGalleryProps {
  media?: ProjectMedia[];
  title?: string;
}

const MediaGallery: React.FC<MediaGalleryProps> = ({ media, title }) => {
  if (!media || media.length === 0) {
    return (
      <div className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-secondary to-white dark:from-gray-800 dark:to-gray-900 p-8 text-center text-gray-500 dark:text-gray-300">
        No media available yet.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {media.map((item, index) => (
        <figure key={`${item.src}-${index}`} className="space-y-3">
          <div className="relative w-full rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-700">
            {item.type === 'video' ? (
              <video
                controls
                preload="metadata"
                poster={item.poster}
                className="w-full h-auto"
              >
                <source src={item.src} />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={item.src}
                alt={item.alt || `${title || 'Project'} media ${index + 1}`}
                className="w-full h-auto block"
                style={{ maxHeight: '480px', objectFit: 'contain' }}
                decoding="async"
              />
            )}
          </div>
          {item.caption && (
            <figcaption className="text-sm text-gray-500 dark:text-gray-400 text-center">
              {item.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
};

export default MediaGallery;
