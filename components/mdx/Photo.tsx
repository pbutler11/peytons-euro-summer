import Image from 'next/image';

type PhotoProps = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  align?: 'left' | 'right' | 'center';
};

/**
 * Use in MDX like:
 *   <Photo src="/photos/barcelona/sagrada-familia.jpg" alt="..." caption="..." />
 */
export function Photo({
  src,
  alt,
  caption,
  width = 800,
  height = 600,
  align = 'center',
}: PhotoProps) {
  return (
    <figure className={`mdx-photo mdx-photo-${align}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="mdx-photo-img"
      />
      {caption && <figcaption className="mdx-photo-caption">{caption}</figcaption>}
    </figure>
  );
}