import { fetchAuthToken } from "./user";

export async function fetchUserPlaylists() {
  const token = await fetchAuthToken();
  if (!token) return [];

  const res = await fetch("/api/playlists/me", {
    headers: { "Authorization": `Bearer ${token}` },
    credentials: "include",
  });

  if (!res.ok) return [];
  return await res.json();
}

export async function fetchPlaylistsByUserId() {
  const token = await fetchAuthToken();
  if (!token) return [];

  const res = await fetch("/api/library/playlists", {
    headers: { "Authorization": `Bearer ${token}` },
    credentials: "include",
  });

  if (!res.ok) return [];
  return await res.json();
}

export async function fetchPlaylistSongs(playlistId: number) {
  const token = await fetchAuthToken();
  if (!token) return [];

  const res = await fetch(`/api/library/playlists/${playlistId}/songs`, {
    headers: {"Authorization": `Bearer ${token}` },
    credentials: "include",
  });

  if (!res.ok) return [];
  return await res.json();
}