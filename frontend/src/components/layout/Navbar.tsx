import { useEffect, useState } from "react";
import { getCurrentUser } from "@/api/user";
import { User } from "@/types/user";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  return (
    <nav className="w-full px-4 sm:px-6 py-4 bg-white shadow-sm flex justify-between items-center">
      <h1 className="text-xl font-semibold">Rekords</h1>
      <div>{user ? `${user.username}` : "(no user)"}</div>
    </nav>
  );
}