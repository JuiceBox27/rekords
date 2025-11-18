import { Card, CardContent } from "@/components/ui/card";

export default function TrackCard({ track }: { track: any }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold">{track.title}</h3>
        <p className="text-sm text-gray-500">{track.artist}</p>
        <p className="text-sm mt-2">BPM: {track.bpm}</p>
      </CardContent>
    </Card>
  );
}
