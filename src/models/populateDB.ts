import { Client } from 'pg';

const query = `
-- USERS TABLE
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT false,

  CONSTRAINT uq_users_username UNIQUE (username),
  CONSTRAINT chk_users_username_length CHECK (length(username) BETWEEN 3 AND 50)
);

-- GENRES TABLE
CREATE TABLE IF NOT EXISTS genres (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  description TEXT,

  CONSTRAINT uq_genres_name UNIQUE (name),
  CONSTRAINT chk_genres_description_length CHECK (length(description) < 300)
);

-- MOVIES TABLE
CREATE TABLE IF NOT EXISTS movies (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  pitch TEXT,
  photo_url TEXT,
  release_year INT NOT NULL,
  runtime INT NOT NULL,
  director TEXT NOT NULL,
  starring TEXT,

  CONSTRAINT uq_movies_title UNIQUE (title),
  CONSTRAINT chk_movies_title_length CHECK (length(title) < 200),
  CONSTRAINT chk_movies_pitch_length CHECK (length(pitch) < 500),
  CONSTRAINT chk_movies_director_length CHECK (length(director) < 200),
  CONSTRAINT chk_movies_starring_length CHECK (length(starring) < 500),
  CONSTRAINT chk_movies_release_year CHECK (release_year BETWEEN 1888 AND 2100),
  CONSTRAINT chk_movies_runtime CHECK (runtime BETWEEN 1 AND 1440)
);

-- MOVIES_GENRES JUNCTION TABLE
CREATE TABLE IF NOT EXISTS movies_genres (
  movie_id INT REFERENCES movies(id) ON DELETE CASCADE,
  genre_id INT REFERENCES genres(id) ON DELETE CASCADE,
  PRIMARY KEY (movie_id, genre_id)
);

-- USERS_MOVIES JUNCTION TABLE
CREATE TABLE IF NOT EXISTS users_movies (
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  movie_id INT REFERENCES movies(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, movie_id)
);

-- 1. SEED USERS 
INSERT INTO users (username, password, is_admin) VALUES 
('rohit', '$2b$10$9aX8j.orZUq.F.YSZnzU.OWvPA7LNu4sjcTSWT0Af4tMp/NJCMppi', true)
ON CONFLICT (username) DO NOTHING;


-- 2. SEED GENRES
INSERT INTO genres (name, description) VALUES 
('action', 'High energy, thrilling stunts, and fast-paced sequences.'),
('thriller', 'Suspenseful, gripping plots keeping you on the edge of your seat.'),
('musical', 'Stories driven or accompanied heavily by song and dance numbers.'),
('comedy', 'Lighthearted and designed to make the audience laugh.'),
('drama', 'Character-driven stories with high emotional stakes.'),
('sci-fi', 'Explorations of futuristic technology and space travel.'),
('romance', 'Stories focusing on love and interpersonal relationships.'),
('animation', 'Artistic illustrated stories across various subgenres.')
ON CONFLICT (name) DO NOTHING;


-- 3. SEED MOVIES (Mapped to title, pitch, photo_url, release_year, runtime, director)
INSERT INTO movies (title, pitch, photo_url, release_year, runtime, director, starring) VALUES 
('About Time', 'A young man discovers he can travel back in time to change his own life.', 'https://example.com/about_time.jpg', 2013, 123, 'Richard Curtis', 'Domhnall Gleeson, Rachel McAdams'),
('A Silent Voice', 'A former bully tries to make amends with a deaf girl he tormented in elementary school.', 'https://example.com/silent_voice.jpg', 2016, 130, 'Naoko Yamada', 'Miyu Irino, Saori Hayami'),
('Your Name', 'Two strangers find themselves linked in a bizarre way when they wake up in each others bodies.', 'https://example.com/your_name.jpg', 2016, 106, 'Makoto Shinkai', 'Ryunosuke Kamiki, Mone Kamishirakeishi'),
('The Wind Rises', 'A look at the life of Jiro Horikoshi, the man who designed Japanese fighter planes during WWII.', 'https://example.com/wind_rises.jpg', 2013, 126, 'Hayao Miyazaki', 'Hideaki Anno, Miori Takimoto'),
('The Prestige', 'After a tragic accident, two stage magicians in 1890s London engage in a battle to create the ultimate illusion.', 'https://example.com/prestige.jpg', 2006, 130, 'Christopher Nolan', 'Christian Bale, Hugh Jackman'),
('Grave of the Fireflies', 'A devastating story of two siblings struggling to survive in Japan during World War II.', 'https://example.com/grave_fireflies.jpg', 1988, 89, 'Isao Takahata', 'Tsutomu Tatsumi, Ayano Shiraishi'),
('Interstellar', 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity''s survival.', 'https://example.com/interstellar.jpg', 2014, 169, 'Christopher Nolan', 'Matthew McConaughey, Anne Hathaway'),
('The Shining', 'A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence.', 'https://example.com/shining.jpg', 1980, 146, 'Stanley Kubrick', 'Jack Nicholson, Shelley Duvall'),
('Inception', 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task.', 'https://example.com/inception.jpg', 2010, 148, 'Christopher Nolan', 'Leonardo DiCaprio, Joseph Gordon-Levitt'),
('The Godfather', 'The aging patriarch of an organized crime dynasty transfers control to his reluctant son.', 'https://example.com/godfather.jpg', 1972, 175, 'Francis Ford Coppola', 'Marlon Brando, Al Pacino'),
('John Wick', 'An ex-hit-man comes out of retirement to track down the gangsters that killed his dog.', 'https://example.com/john_wick.jpg', 2014, 101, 'Chad Stahelski', 'Keanu Reeves, Michael Nyqvist'),
('Scent of a Woman', 'A prep school student agrees to "babysit" a blind, disgruntled retired Army Lieutenant Colonel.', 'https://example.com/scent_woman.jpg', 1992, 156, 'Martin Brest', 'Al Pacino, Chris O''Donnell'),
('Prisoners', 'When Keller Dover''s daughter goes missing, he takes matters into his own hands.', 'https://example.com/prisoners.jpg', 2013, 153, 'Denis Villeneuve', 'Hugh Jackman, Jake Gyllenhaal'),
('Manchester by the Sea', 'A depressed uncle is asked to take care of his teenage nephew after the boy''s father dies.', 'https://example.com/manchester.jpg', 2016, 137, 'Kenneth Lonergan', 'Casey Affleck, Michelle Williams')
ON CONFLICT (title) DO NOTHING;


-- 4. MAP MOVIES TO GENRES (Using title lookups instead of hardcoded IDs for total safety)
INSERT INTO movies_genres (movie_id, genre_id) VALUES
((SELECT id FROM movies WHERE title = 'About Time'), (SELECT id FROM genres WHERE name = 'romance')),
((SELECT id FROM movies WHERE title = 'About Time'), (SELECT id FROM genres WHERE name = 'drama')),

((SELECT id FROM movies WHERE title = 'A Silent Voice'), (SELECT id FROM genres WHERE name = 'animation')),
((SELECT id FROM movies WHERE title = 'A Silent Voice'), (SELECT id FROM genres WHERE name = 'drama')),

((SELECT id FROM movies WHERE title = 'Your Name'), (SELECT id FROM genres WHERE name = 'animation')),
((SELECT id FROM movies WHERE title = 'Your Name'), (SELECT id FROM genres WHERE name = 'romance')),

((SELECT id FROM movies WHERE title = 'The Wind Rises'), (SELECT id FROM genres WHERE name = 'animation')),
((SELECT id FROM movies WHERE title = 'The Wind Rises'), (SELECT id FROM genres WHERE name = 'drama')),

((SELECT id FROM movies WHERE title = 'The Prestige'), (SELECT id FROM genres WHERE name = 'thriller')),
((SELECT id FROM movies WHERE title = 'The Prestige'), (SELECT id FROM genres WHERE name = 'drama')),

((SELECT id FROM movies WHERE title = 'Grave of the Fireflies'), (SELECT id FROM genres WHERE name = 'animation')),
((SELECT id FROM movies WHERE title = 'Grave of the Fireflies'), (SELECT id FROM genres WHERE name = 'drama')),

((SELECT id FROM movies WHERE title = 'Interstellar'), (SELECT id FROM genres WHERE name = 'sci-fi')),
((SELECT id FROM movies WHERE title = 'Interstellar'), (SELECT id FROM genres WHERE name = 'drama')),

((SELECT id FROM movies WHERE title = 'The Shining'), (SELECT id FROM genres WHERE name = 'thriller')),

((SELECT id FROM movies WHERE title = 'Inception'), (SELECT id FROM genres WHERE name = 'sci-fi')),
((SELECT id FROM movies WHERE title = 'Inception'), (SELECT id FROM genres WHERE name = 'action')),

((SELECT id FROM movies WHERE title = 'The Godfather'), (SELECT id FROM genres WHERE name = 'drama')),

((SELECT id FROM movies WHERE title = 'John Wick'), (SELECT id FROM genres WHERE name = 'action')),
((SELECT id FROM movies WHERE title = 'John Wick'), (SELECT id FROM genres WHERE name = 'thriller')),

((SELECT id FROM movies WHERE title = 'Scent of a Woman'), (SELECT id FROM genres WHERE name = 'drama')),

((SELECT id FROM movies WHERE title = 'Prisoners'), (SELECT id FROM genres WHERE name = 'thriller')),
((SELECT id FROM movies WHERE title = 'Prisoners'), (SELECT id FROM genres WHERE name = 'drama')),

((SELECT id FROM movies WHERE title = 'Manchester by the Sea'), (SELECT id FROM genres WHERE name = 'drama'))
ON CONFLICT DO NOTHING;
`;

async function main() {
  console.log('seeding...');
  const dbUri = process.argv[2] || process.env.DB_URI;

  if (!dbUri) {
    console.error('Error: No database URI provided in .env or arguments.');
    process.exit(1);
  }

  const client = new Client({ connectionString: dbUri });

  try {
    await client.connect();
    await client.query(query);
    console.log('Done');
  } catch (err) {
    console.error('Error: ', err);
  } finally {
    await client.end();
  }
}

await main();
