import { Routes, Route } from "react-router-dom";
import LibraryPage from "@/pages/Library/LibraryPage";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LibraryPage />} />
    </Routes>
  );
}