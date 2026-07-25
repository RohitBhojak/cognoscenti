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
  poster_url: string | null;
  banner_url: string | null;
  release_year: number;
  runtime: number;
  director: string;
  starring: string | null;
  created_by?: number | null;
}

export interface Genre {
  id: number;
  name: string;
  description: string | null;
}

export const MOVIE_STATUS = ['watched', 'watchlist'] as const;
export type MovieStatus = (typeof MOVIE_STATUS)[number];
