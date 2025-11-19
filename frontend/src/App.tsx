import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router";
import Navbar from "@/components/layout/NavBar";

export default function App() {
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