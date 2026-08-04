export interface User {
  id: number;
  username: string;
  password: string;
  is_admin: boolean;
  created_at: string;
}

export type CreateUserInput = Omit<User, 'id' | 'created_at'>;

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
  created_at: string;
}

export interface Genre {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
}

export const MOVIE_STATUS = ['watched', 'watchlist'] as const;
export type MovieStatus = (typeof MOVIE_STATUS)[number];
