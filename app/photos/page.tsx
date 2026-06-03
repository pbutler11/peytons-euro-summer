import Link from 'next/link';
import Image from 'next/image';
import { getAllPhotos } from '@/lib/posts';
import { getCityBySlug } from '@/lib/cities';

export const metadata = {
  title: "photo dump — peyton's euro summer ✿",
  description: 'every photo from the trip',
};

export default function PhotoDumpPage() {
  const photos = getAllPhotos();

  return (
    <div className="photos-page">
      <div className="breadcrumb">
        <Link href="/">← back to home</Link>
      </div>

      <header className="photos-header">
        <h1 className="photos-title">✿ photo dump ✿</h1>
        <p className="photos-subtitle">
          every shot from the trip · {photos.length}{' '}
          {photos.length === 1 ? 'photo' : 'photos'}
        </p>
      </header>

      {photos.length === 0 ? (
        <div className="empty-state bevel-inset">
          <p>no photos yet... soon ✦</p>
        </div>
      ) : (
        <div className="photo-grid">
          {photos.map((photo, idx) => {
            const city = getCityBySlug(photo.citySlug);
            return (
              <Link
                key={`${photo.src}-${idx}`}
                href={`/${photo.citySlug}/${photo.postSlug}`}
                className="photo-tile"
              >
                <div className="photo-tile-image">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 600px) 50vw, 300px"
                    className="photo-tile-img"
                  />
                </div>
                <div className="photo-tile-meta">
                  <span className="photo-tile-city">
                    {city?.flag} {city?.name ?? photo.citySlug}
                  </span>
                  {photo.caption && (
                    <span className="photo-tile-caption">{photo.caption}</span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}