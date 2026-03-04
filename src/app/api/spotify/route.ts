import { NextResponse } from "next/server";

export const runtime = "nodejs";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";

async function getAccessToken() {
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN!,
    }),
  });
  return res.json();
}

export async function GET() {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    return NextResponse.json({ isPlaying: false, _d: "no_env" });
  }

  try {
    const tokenData = await getAccessToken();
    const { access_token } = tokenData;

    if (!access_token) {
      return NextResponse.json({
        isPlaying: false,
        _d: "no_token",
        _e: tokenData.error,
        _tokenLen: REFRESH_TOKEN.length,
        _tokenStart: REFRESH_TOKEN.slice(0, 8),
      });
    }

    const res = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (res.status === 204) {
      return NextResponse.json({ isPlaying: false, _d: "204_nothing_playing" });
    }
    if (res.status > 400) {
      return NextResponse.json({ isPlaying: false, _d: `status_${res.status}` });
    }

    const data = await res.json();

    if (!data || !data.item) {
      return NextResponse.json({ isPlaying: false, _d: "no_item" });
    }

    return NextResponse.json({
      isPlaying: data.is_playing,
      title: data.item.name,
      artist: data.item.artists.map((a: { name: string }) => a.name).join(", "),
      album: data.item.album.name,
      albumArt: data.item.album.images[0]?.url,
      songUrl: data.item.external_urls.spotify,
    });
  } catch (e) {
    return NextResponse.json({ isPlaying: false, _d: "exception", _e: String(e) });
  }
}
