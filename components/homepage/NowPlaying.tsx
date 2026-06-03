import { NOW_PLAYING } from '@/lib/now-playing';

/**
 * Fetches the album art URL from Spotify's public Open Graph metadata.
 * No API key needed — Spotify exposes <meta property="og:image"> on every track page.
 * Cached for 1 hour so we're not hammering Spotify on every page load.
 */
async function getAlbumArt(trackId: string): Promise<string | null> {
  try {
    const res = await fetch(`https://open.spotify.com/track/${trackId}`, {
      next: { revalidate: 3600 },
      headers: {
        'User-Agent': 'Mozilla/5.0 (peyton-euro-summer-blog)',
      },
    });
    if (!res.ok) return null;
    const html = await res.text();
    const match = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/);
    return match?.[1] ?? null;
  } catch {
    return null;
  }
}

export async function NowPlayingWidget() {
  const np = NOW_PLAYING;
  const art = await getAlbumArt(np.spotifyTrackId);
  const spotifyLink = `https://open.spotify.com/track/${np.spotifyTrackId}`;

  return (
    <div className="bevel np-widget">
      <div className="widget-title pink">♪ now playing</div>
      <div className="np-widget-body">
        {art && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={art}
            alt={`${np.track} album art`}
            className="np-art"
            width={140}
            height={140}
          />
        )}
        <div className="np-info">
          <div className="np-artist">{np.artist}</div>
          <div className="np-track">&ldquo;{np.track}&rdquo;</div>
          <div className="np-listen-links">
            <a  href={spotifyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="np-listen-link">
                ▶ spotify ↗
              </a>
            
            
              
            {np.appleMusicUrl && (
              <a href={np.appleMusicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="np-listen-link">
                ♫ apple music ↗
                </a>
                 
            )}
          </div>
        </div>
      </div>
    </div>
  );
}