'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

type PhotoItem = {
  src: string;
  alt: string;
  caption?: string;
  /**
   * Where to crop from. Default is "center center".
   * For portrait subjects: "center top" or "top" keeps faces/heads in frame.
   * For sunsets: "center bottom" keeps the horizon visible.
   * Any CSS object-position value works: "left top", "right center", "50% 30%", etc.
   */
  focus?: string;
};

type PhotoCarouselProps = {
  photos: PhotoItem[];
  aspect?: string;
};

export function PhotoCarousel({ photos, aspect = '4/3' }: PhotoCarouselProps) {
  const [index, setIndex] = useState(0);
  const safePhotos = Array.isArray(photos) ? photos : [];
  const total = safePhotos.length;

  useEffect(() => {
    if (total === 0) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setIndex((i) => (i === 0 ? total - 1 : i - 1));
      }
      if (e.key === 'ArrowRight') {
        setIndex((i) => (i === total - 1 ? 0 : i + 1));
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [total]);

  if (total === 0) {
    return (
      <div className="carousel-empty">
        <p style={{ fontStyle: 'italic', color: 'var(--c-muted)' }}>
          [ no photos yet ]
        </p>
      </div>
    );
  }

  const current = safePhotos[index];
  const prev = () => setIndex((i) => (i === 0 ? total - 1 : i - 1));
  const next = () => setIndex((i) => (i === total - 1 ? 0 : i + 1));

  return (
    <div className="carousel">
      <div className="carousel-frame" style={{ aspectRatio: aspect }}>
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          fill
          sizes="(max-width: 600px) 100vw, 800px"
          className="carousel-image"
          style={{ objectPosition: current.focus ?? 'center center' }}
          priority={index === 0}
        />
      </div>

      <div className="carousel-controls">
        <button
          type="button"
          onClick={prev}
          className="carousel-btn"
          aria-label="previous photo"
        >
          ◂ prev
        </button>
        <span className="carousel-counter">
          {index + 1} of {total}
        </span>
        <button
          type="button"
          onClick={next}
          className="carousel-btn"
          aria-label="next photo"
        >
          next ▸
        </button>
      </div>

      {current.caption && (
        <p className="carousel-caption">{current.caption}</p>
      )}
    </div>
  );
}