export async function getCurrentUser(username: string) {
  const res = await fetch(`/api/me?username=${encodeURIComponent(username)}`);
  if (!res.ok) return null;
  return await res.json();
}