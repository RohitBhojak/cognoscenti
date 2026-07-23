export interface User {
  id: number;
  username: string;
  password_hash: string;
  is_admin: boolean;
}

export interface Movie {
  id: number;
  title: string;
  pitch: string | null;
  photo_url: string | null;
  release_year: number;
  runtime: number;
  director: string;
  starring: string | null;
  is_watched: boolean;
}

export interface Genre {
  id: number;
  name: string;
  description: string | null;
}
