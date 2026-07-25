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
  created_by INT REFERENCES users(id) ON DELETE SET NULL,

  CONSTRAINT uq_genres_name UNIQUE (name),
  CONSTRAINT chk_genres_description_length CHECK (length(description) < 300)
);

-- MOVIES TABLE
CREATE TABLE IF NOT EXISTS movies (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  pitch TEXT,
  poster_url TEXT,
  banner_url TEXT,
  release_year INT NOT NULL,
  runtime INT NOT NULL,
  director TEXT NOT NULL,
  starring TEXT,
  created_by INT REFERENCES users(id) ON DELETE SET NULL,

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

-- MOVIE_STATUS ENUM
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'movie_status') THEN
    CREATE TYPE movie_status AS ENUM ('watchlist', 'watched');
  END IF;
END $$;

-- USERS_MOVIES JUNCTION TABLE
CREATE TABLE IF NOT EXISTS users_movies (
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  movie_id INT REFERENCES movies(id) ON DELETE CASCADE,
  status movie_status NOT NULL DEFAULT 'watchlist',
  PRIMARY KEY (user_id, movie_id)
);