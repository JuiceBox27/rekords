export type Song = {
  id: number;
  title: string;
  artist: string;
  album: string | null;
  duration: number;
  bpm: number;
  genre: string | null;
  created_at: string; // ISO timestamp from API
};