-- Create 30 playlists for users 1..5
-- Each playlist gets a random genre and description

INSERT INTO playlists (name, genre, description, user_id, created_at)
SELECT
    'Playlist ' || i AS name,
    (ARRAY['Pop','Rock','Electronic','Hip-Hop','Jazz','Classical','Ambient','Indie'])[(floor(random()*8)::int)+1] AS genre,
    'Auto-generated playlist ' || i AS description,
    (1 + (random() * 4)::int) AS user_id,  -- random user ID between 1 and 5
    now() AS created_at
FROM generate_series(1, 30) AS g(i);