import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import pool from '../models/pool.js';

const PgSessionStore = connectPgSimple(session);

const secret = process.env.SESSION_SECRET;

if (!secret) {
  throw new Error('SESSION_SECRET must be set in env, check .env.example');
}

const sessionMiddleware = session({
  store: new PgSessionStore({ pool }),
  secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 15,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  },
});

export default sessionMiddleware;
