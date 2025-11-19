export async function fetchUserPlaylists(username: string) {
  const res = await fetch(`/api/playlists/me?username=${username}`, {
    credentials: "include",
  });

  if (!res.ok) return [];
  return await res.json();
}

export async function fetchPlaylistsByUserId(userId: number) {
  const res = await fetch(`/api/library/playlists?user_id=${userId}`, {
    credentials: "include",
  });

  if (!res.ok) return [];
  return await res.json();
}