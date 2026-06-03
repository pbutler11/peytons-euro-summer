/**
 * The currently-featured song on the homepage.
 * Update this whenever the vibe shifts.
 *
 * To update: change the values below, then run `git push`.
 * Album art is fetched automatically from Spotify's public metadata.
 *
 * To get the Apple Music link: open the song in browser at music.apple.com,
 * copy the URL from the address bar. Paste it as-is into `appleMusicUrl`.
 */
export type NowPlaying = {
    artist: string;
    track: string;
    spotifyTrackId: string; // used for album art + Spotify link
    appleMusicUrl?: string; // full Apple Music URL, optional
  };
  
  export const NOW_PLAYING: NowPlaying = {
    artist: 'bad bunny',
    track: 'baile inolvidable',
    spotifyTrackId: '2lTm559tuIvatlT1u0JYG2',
    appleMusicUrl:
      'https://music.apple.com/us/album/baile-inolvidable/1797128020?i=1797128032',
  };