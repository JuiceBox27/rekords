import { Routes, Route } from "react-router-dom";
import LibraryPage from "@/pages/Library/LibraryPage";
import PlaylistPage from "@/pages/Library/PlaylistPage";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/Library" element={<LibraryPage />} />
      <Route path="/library/playlist/:playlistSlugAndId" element={<PlaylistPage />} />
    </Routes>
  );
}