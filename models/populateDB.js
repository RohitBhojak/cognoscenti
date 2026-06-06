const { Client } = require("pg");

const query = `
-- 1. ROLES TABLE
CREATE TABLE IF NOT EXISTS roles (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT UNIQUE NOT NULL,
    min_watched_required INT DEFAULT 0,
    min_approval_rate FLOAT DEFAULT 0.0
);

-- 2. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username TEXT UNIQUE NOT NULL,
    password TEXT CHECK (LENGTH(password) >= 8) NOT NULL,
    role_id INT REFERENCES roles(id) ON DELETE SET NULL
);

-- 3. GENRES TABLE
CREATE TABLE IF NOT EXISTS genres (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT UNIQUE NOT NULL,
    "desc" TEXT
);

-- 4. MOVIES TABLE
CREATE TABLE IF NOT EXISTS movies (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title TEXT NOT NULL,
    "desc" TEXT,
    photo_url TEXT,
    release_year INT,
    recommended_by_user_id INT REFERENCES users(id) ON DELETE SET NULL,
    review_notes TEXT
);

-- 5. MOVIES_GENRES JUNCTION TABLE
CREATE TABLE IF NOT EXISTS movies_genres (
    movie_id INT REFERENCES movies(id) ON DELETE CASCADE,
    genre_id INT REFERENCES genres(id) ON DELETE CASCADE,
    PRIMARY KEY (movie_id, genre_id)
);

-- 6. COMMENTS TABLE
CREATE TABLE IF NOT EXISTS comments (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    comment_text TEXT NOT NULL,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    movie_id INT REFERENCES movies(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 7. USER ENGAGEMENT TABLE
CREATE TABLE IF NOT EXISTS user_engagement (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    movie_id INT REFERENCES movies(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    has_watched BOOLEAN DEFAULT FALSE,
    rating INT CHECK (rating <= 5 AND rating >= 1)
);

--- SEEDING DATA ---

INSERT INTO roles (name, min_watched_required, min_approval_rate) VALUES 
('BASIC', 0, 0.0),
('MODERATOR', 10, 70.00),
('ADMIN', 10, 100.00)
ON CONFLICT (name) DO NOTHING;

INSERT INTO users (username, password, role_id) VALUES 
('rohit', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36wTkyb7X8.A2.A2b1A2b1A', (SELECT id FROM roles WHERE name = 'ADMIN'))
ON CONFLICT (username) DO NOTHING;

INSERT INTO genres (name, "desc") VALUES 
('action', 'High energy, thrilling stunts, and fast-paced sequences.'),
('thriller', 'Suspenseful, gripping plots keeping you on the edge of your seat.'),
('musical', 'Stories driven or accompanied heavily by song and dance numbers.'),
('comedy', 'Lighthearted and designed to make the audience laugh.'),
('drama', 'Character-driven stories with high emotional stakes.'),
('sci-fi', 'Explorations of futuristic technology and space travel.'),
('romance', 'Stories focusing on love and interpersonal relationships.'),
('animation', 'Artistic illustrated stories across various subgenres.')
ON CONFLICT (name) DO NOTHING;

INSERT INTO movies (title, "desc", photo_url, release_year, recommended_by_user_id, review_notes) VALUES 
('About Time', 'A young man discovers he can travel back in time to change his own life.', 'https://example.com/about_time.jpg', 2013, 1, 'Incredibly heartwarming romantic drama.'),
('A Silent Voice', 'A former bully tries to make amends with a deaf girl he tormented in elementary school.', 'https://example.com/silent_voice.jpg', 2016, 1, 'Deeply emotional masterpiece about redemption.'),
('Your Name', 'Two strangers find themselves linked in a bizarre way when they wake up in each others bodies.', 'https://example.com/your_name.jpg', 2016, 1, 'Visually stunning and narrative perfection.'),
('The Wind Rises', 'A look at the life of Jiro Horikoshi, the man who designed Japanese fighter planes during WWII.', 'https://example.com/wind_rises.jpg', 2013, 1, 'Beautiful Ghibli film about passion and dreams.'),
('The Prestige', 'After a tragic accident, two stage magicians in 1890s London engage in a battle to create the ultimate illusion.', 'https://example.com/prestige.jpg', 2006, 1, 'A gripping thriller with an amazing twist.'),
('Grave of the Fireflies', 'A devastating story of two siblings struggling to survive in Japan during World War II.', 'https://example.com/grave_fireflies.jpg', 1988, 1, 'Heartbreaking, but an essential watch.'),
('Interstellar', 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity''s survival.', 'https://example.com/interstellar.jpg', 2014, 1, 'Visually grand sci-fi epic with a massive heart.'),
('The Shining', 'A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence.', 'https://example.com/shining.jpg', 1980, 1, 'Classic psychological horror/thriller.'),
('Inception', 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task.', 'https://example.com/inception.jpg', 2010, 1, 'Mind-bending action thriller.'),
('The Godfather', 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', 'https://example.com/godfather.jpg', 1972, 1, 'One of the greatest cinematic achievements of all time.'),
('John Wick', 'An ex-hit-man comes out of retirement to track down the gangsters that killed his dog.', 'https://example.com/john_wick.jpg', 2014, 1, 'Peak action choreography.'),
('Scent of a Woman', 'A prep school student needing money agrees to "babysit" a blind, disgruntled retired Army Lieutenant Colonel.', 'https://example.com/scent_woman.jpg', 1992, 1, 'Pacino gives an absolute masterclass performance.'),
('Prisoners', 'When Keller Dover''s daughter and her friend go missing, he takes matters into his own hands.', 'https://example.com/prisoners.jpg', 2013, 1, 'Incredibly intense and dark thriller.'),
('Manchester by the Sea', 'A depressed uncle is asked to take care of his teenage nephew after the boy''s father dies.', 'https://example.com/manchester.jpg', 2016, 1, 'A raw, accurate depiction of grief.');

-- Map movies to genres (Assuming continuous sequential IDs 1-14 for movies)
INSERT INTO movies_genres (movie_id, genre_id) VALUES
(1, (SELECT id FROM genres WHERE name = 'romance')), (1, (SELECT id FROM genres WHERE name = 'drama')),
(2, (SELECT id FROM genres WHERE name = 'animation')), (2, (SELECT id FROM genres WHERE name = 'drama')),
(3, (SELECT id FROM genres WHERE name = 'animation')), (3, (SELECT id FROM genres WHERE name = 'romance')),
(4, (SELECT id FROM genres WHERE name = 'animation')), (4, (SELECT id FROM genres WHERE name = 'drama')),
(5, (SELECT id FROM genres WHERE name = 'thriller')), (5, (SELECT id FROM genres WHERE name = 'drama')),
(6, (SELECT id FROM genres WHERE name = 'animation')), (6, (SELECT id FROM genres WHERE name = 'drama')),
(7, (SELECT id FROM genres WHERE name = 'sci-fi')), (7, (SELECT id FROM genres WHERE name = 'drama')),
(8, (SELECT id FROM genres WHERE name = 'thriller')),
(9, (SELECT id FROM genres WHERE name = 'sci-fi')), (9, (SELECT id FROM genres WHERE name = 'action')),
(10, (SELECT id FROM genres WHERE name = 'drama')),
(11, (SELECT id FROM genres WHERE name = 'action')), (11, (SELECT id FROM genres WHERE name = 'thriller')),
(12, (SELECT id FROM genres WHERE name = 'drama')),
(13, (SELECT id FROM genres WHERE name = 'thriller')), (13, (SELECT id FROM genres WHERE name = 'drama')),
(14, (SELECT id FROM genres WHERE name = 'drama'));
`;

async function main() {
  console.log("seeding...");
  // Fixed instantiation via 'new' and process environment fallback handling
  const dbUri = process.argv0 || process.env.DB_URI;
  const client = new Client({ connectionString: dbUri });

  try {
    await client.connect();
    await client.query(query);
    console.log("Done");
  } catch (err) {
    console.error("Error: ", err); // Fixed logging reference variable name error
  } finally {
    await client.end();
  }
}

main();
