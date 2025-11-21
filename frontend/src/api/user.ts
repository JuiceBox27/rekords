// 1. Fetch a test JWT from backend
import { User } from "@/types/user";

export async function fetchAuthToken(): Promise<string | null> {
  const res = await fetch("/api/auth/token");
  if (!res.ok) return null;
  const data = await res.json();
  return data.token;
}

// 2. Use JWT to fetch current user
export async function getCurrentUser(): Promise<User | null> {
  const token = await fetchAuthToken();
  if (!token) return null;

  const res = await fetch("/api/me", {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!res.ok) return null;
  return (await res.json()) as User; // cast to User type
}