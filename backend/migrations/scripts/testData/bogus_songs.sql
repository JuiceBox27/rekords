-- Helper arrays for genres and albums
-- (we will reference these inside SELECTs below)
-- Insert 100 random songs (with album, genre and created_at = now())
INSERT INTO songs (title, artist, album, genre, bpm, duration, created_at)
SELECT
    'Song ' || i AS title,
    'Artist ' || ((i % 20) + 1) AS artist,
    'Album ' || ((i % 25) + 1) AS album,
    (ARRAY['Pop','Rock','Electronic','Hip-Hop','Jazz','Classical','Ambient','Indie'])[(floor(random()*8)::int)+1] AS genre,
    80 + (random() * 80)::int AS bpm,
    120 + (random() * 180)::int AS duration,
    now() AS created_at
FROM generate_series(1, 100) AS s(i)
ON CONFLICT DO NOTHING;