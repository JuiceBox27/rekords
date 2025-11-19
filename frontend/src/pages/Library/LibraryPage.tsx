import { useEffect, useState } from "react";
import PlaylistCard from "@/components/ui/PlaylistCard";
import { Button } from "@/components/ui/Button";
import ImportModal from "@/components/ui/ImportModal";
import { fetchPlaylistsByUserId } from "@/api/playlists";
import { getCurrentUser } from "@/api/user";

interface Playlist {
  id: string;
  name: string;
  tracks?: number;
  createdAt?: string;
  // optional playlist-specific fields
  genre?: string;
  bpmFrom?: number;
  bpmTo?: number;
  description?: string;
}

export default function LibraryPage() {
  const [collections, setCollections] = useState<Playlist[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedImport, setSelectedImport] = useState<string | null>(null);
  const [demoShown, setDemoShown] = useState(false);

  const sampleCollections: Playlist[] = [
    {
      id: "demo-1",
      name: "Chill House Essentials",
      genre: "House",
      bpmFrom: 115,
      bpmTo: 125,
      description: "Deep, groovy house perfect for sunset sets.",
      tracks: 24,
      createdAt: "2025-01-01T00:00:00.000Z",
    },
    {
      id: "demo-2",
      name: "Peak-Time Tech",
      genre: "Techno",
      bpmFrom: 125,
      bpmTo: 135,
      description: "Hard-hitting peak time tracks to keep the energy high.",
      tracks: 18,
      createdAt: "2025-02-14T00:00:00.000Z",
    },
    {
      id: "demo-3",
      name: "Downtempo & Chill",
      genre: "Downtempo",
      bpmFrom: 60,
      bpmTo: 90,
      description: "Laid back instrumentals and ambient textures.",
      tracks: 40,
      createdAt: "2024-12-05T00:00:00.000Z",
    },
  ];

  useEffect(() => {
    fetch("/api/library")
      .then((res) => res.json())
      .then((data) => setCollections(data.collections || data.playlists || []))
      .catch(console.error);
  }, []);

  useEffect(() => {
    async function loadLibrary() {
      // 1. Get current user (replace "test1" once you add real auth)
      const user = await getCurrentUser("test2");
      if (!user) return;

      // 2. Load their playlists
      const playlists = await fetchPlaylistsByUserId(user.id);

      // 3. Store in state
      setCollections(playlists);
    }

    loadLibrary();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Library</h1>
        <div className="flex gap-2 relative">
          {/* Dropdown button */}
          <div
            className="relative"
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
          >
            <button
              onClick={() => setMenuOpen((s) => !s)}
              className="inline-flex items-center px-3 py-2 border rounded-md bg-white"
            >
              Import Tracks
              <svg
                className="ml-2 h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.354a.75.75 0 111.14.98l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full w-48 bg-white border rounded-md shadow-lg z-50">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setSelectedImport("Rekordbox XML");
                    setMenuOpen(false);
                    setModalOpen(true);
                  }}
                >
                  Rekordbox XML
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setSelectedImport("Spotify");
                    setMenuOpen(false);
                    setModalOpen(true);
                  }}
                >
                  Spotify
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setSelectedImport("SoundCloud");
                    setMenuOpen(false);
                    setModalOpen(true);
                  }}
                >
                  SoundCloud
                </button>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            onClick={() => {
              if (!demoShown) {
                setCollections(sampleCollections);
                setDemoShown(true);
              } else {
                setCollections([]);
                setDemoShown(false);
              }
            }}
          >
            {demoShown ? "Hide demo" : "Show demo"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {collections.map((col) => (
          <PlaylistCard
            key={col.id}
            name={col.name}
            genre={col.genre}
            bpmFrom={col.bpmFrom}
            bpmTo={col.bpmTo}
            description={col.description ?? (col.tracks ? `Tracks: ${col.tracks}` : undefined)}
            onView={() => {
              // TODO: wire up navigation to playlist view
              console.log("View playlist", col.id);
            }}
          />
        ))}
      </div>

      <ImportModal isOpen={modalOpen} onClose={() => setModalOpen(false)} selectedMethod={selectedImport} />
    </div>
  );
}