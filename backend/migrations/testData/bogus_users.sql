-- must be run as a DB superuser (or a role that can install extensions)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO users (username, password_hash)
VALUES
  ('test1', crypt('test1', gen_salt('bf'::text))),
  ('test2', crypt('test2', gen_salt('bf'::text))),
  ('test3', crypt('test3', gen_salt('bf'::text))),
  ('test4', crypt('test4', gen_salt('bf'::text))),
  ('test5', crypt('test5', gen_salt('bf'::text)))
ON CONFLICT (username) DO NOTHING;