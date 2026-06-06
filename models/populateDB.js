const { Client } = require("pg");

const query = `
CREATE TABLE IF NOT EXISTS roles (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT,
    min_watched_required INT,
    min_approval_rate FLOAT
);

CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username TEXT,
    password TEXT CHECK (LENGTH(password) >= 8),
    role_id INT REFERENCES roles(id)
);

CREATE TABLE IF NOT EXISTS genres (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT,
    "desc" TEXT
);

CREATE TABLE IF NOT EXISTS movies (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title TEXT,
    "desc" TEXT,
    photo_url TEXT,
    release_year INT,
    recommended_by_user_id INT REFERENCES users(id),
    review_notes TEXT
);

CREATE TABLE IF NOT EXISTS directors (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT,
    signature_style TEXT
);
`;

async function main() {
  console.log("seeding...");
  const client = Client({ connectionString: process.argv0 || process.env.DB_URI });
  try {
    await client.connect();
    await client.query(query);
    console.log("Done");
  } catch (err) {
    console.log("Error: ", error);
  } finally {
    await client.end();
  }
}

main();
