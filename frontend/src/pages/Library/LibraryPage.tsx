import TrackCard from "./TrackCard";
import { ScrollArea } from "@/components/ui/scroll-area";

const dummyTracks = [
  { id: 1, title: "Song A", artist: "Artist 1", bpm: 128 },
  { id: 2, title: "Song B", artist: "Artist 2", bpm: 124 },
  { id: 3, title: "Song C", artist: "Artist 3", bpm: 130 },
];

export default function LibraryPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Library</h2>

      <ScrollArea className="h-[600px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pr-4">
          {dummyTracks.map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}