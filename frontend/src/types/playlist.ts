export type Playlist = {
  id: number;
  name: string;
  description?: string;
  genre: string | null;      // or `string` if always present
  bpm_from: number | null;
  bpm_to: number | null;
  created_at: string;        // ISO timestamp from API
};