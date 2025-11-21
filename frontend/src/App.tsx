import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router";
import Navbar from "@/components/layout/NavBar";

export default function App() {
  // TEMP: Set test JWT in localStorage for testing purposes
  useEffect(() => {
    async function fetchToken() {
      // Only fetch if there isn't already a token
      if (!localStorage.getItem("token")) {
        try {
          const res = await fetch("/api/auth/token"); // Replace with your backend endpoint
          if (!res.ok) throw new Error("Failed to get token");

          const data = await res.json();
          const token = data.token; // adjust based on your API response
          localStorage.setItem("token", token);
        } catch (err) {
          console.error("Could not fetch token:", err);
        }
      }
    }

    fetchToken();
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="p-6">
          <AppRouter />
        </main>
      </div>
    </BrowserRouter>
  );
}