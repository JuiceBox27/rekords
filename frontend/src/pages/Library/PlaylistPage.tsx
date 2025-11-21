import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { slugify } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Song } from "@/types/song";
import { Playlist } from "@/types/playlist";

export default function PlaylistSongsPage() {
  const { playlistSlugAndId } = useParams();  // <-- put it right here
  const [songs, setSongs] = useState<Song[]>([]);
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentUserToken = localStorage.getItem("token");   // wherever you store it
  const playlistId = playlistSlugAndId?.split("-").pop() || "";   // Extract playlistSlug from playlistSlugAndId

  console.log("RAW useParams:", useParams());
  console.log("slugAndId:", playlistSlugAndId);
  console.log("Extracted playlistId:", playlistId);

  useEffect(() => {
    async function fetchData() {
      try {
        const playlistId = parseInt(playlistSlugAndId?.split("-").pop() || "", 10);
        if (isNaN(playlistId)) {
          setError("Invalid playlist ID");
          setLoading(false);
          return;
        }

        console.log("Current JWT token:", currentUserToken);

        const resPlaylist = await fetch(`/api/library/playlists/${playlistId}`, {
          headers: {
            "Authorization": `Bearer ${currentUserToken}`,
          },
          credentials: "include",
        });
      
        
        if (!resPlaylist.ok) {
          const data = await resPlaylist.json();
          throw new Error(data.detail?.[0]?.msg || "Failed to fetch playlist");
        }
        
        const playlistData = await resPlaylist.json();
        setPlaylist(playlistData);

        const resSongs = await fetch(`/api/library/playlists/${playlistId}/songs`, {
          headers: {
            "Authorization": `Bearer ${currentUserToken}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
      
        if (!resSongs.ok) {
          const data = await resSongs.json();
          throw new Error(data.detail?.[0]?.msg || "Failed to fetch songs");
        }

        const songsData = await resSongs.json();
        console.log("Songs API result:", songsData);
        setSongs(songsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [playlistId]);

  if (loading) return <div className="p-6 text-xl">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">{playlist?.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {songs.map((song) => (
          <Card key={song.id} className="rounded-2xl shadow-md p-4">
            <CardContent className="space-y-2">
              <h2 className="text-xl font-semibold">{song.title}</h2>
              <p className="text-base">Artist: {song.artist}</p>
              <p className="text-base">BPM: {song.bpm}</p>
              <Button className="w-full mt-2">View Details</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
