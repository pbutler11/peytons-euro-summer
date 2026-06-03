/**
 * Helpers for building photo lists for <PhotoCarousel> without typing
 * full paths every time.
 *
 * Usage in an MDX file:
 *
 *   import { carouselPhotos } from '@/lib/photos';
 *
 *   <PhotoCarousel
 *     photos={carouselPhotos('barcelona', 'day-2', [
 *       { name: 'grumpy dog', caption: 'portable cranky dog', focus: 'center bottom' },
 *       { name: 'pink hospital', caption: 'ceiling in hospital', focus: 'center top' },
 *       { name: 'stylin', caption: 'barcelona cathedral' },
 *       { name: 'tortilla', caption: 'best tortilla of my life' },
 *       { name: 'girl dinner', caption: 'classic girl dinner' },
 *     ])}
 *   />
 */

type PhotoInput = {
    name: string;       // filename without extension (e.g. "grumpy dog")
    caption?: string;   // what shows under the photo
    alt?: string;       // accessibility text — defaults to caption if omitted
    focus?: string;     // CSS object-position, e.g. "center bottom"
    ext?: string;       // file extension, defaults to "jpeg"
  };
  
  export function carouselPhotos(
    city: string,
    day: string,
    photos: PhotoInput[]
  ) {
    return photos.map((p) => ({
      src: `/photos/${city}/${day}/${p.name}.${p.ext ?? 'jpeg'}`,
      alt: p.alt ?? p.caption ?? p.name,
      caption: p.caption,
      focus: p.focus,
    }));
  }