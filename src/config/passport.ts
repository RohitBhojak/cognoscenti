import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { getUserById, getUserByUsername } from '../models/UserRepository.js';
import bcrypt from 'bcrypt';

export const configurePassport = (): void => {
  // Local Strategy config
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await getUserByUsername(username);
        if (!user) {
          return done(null, false, { message: 'Incorrect username' });
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
          return done(null, false, { message: 'Incorrect password' });
        }
        return done(null, user);
      } catch (error) {
        done(error);
      }
    })
  );

  // Serializer config
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserializer config
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await getUserById(id);
      if (!user) {
        return done(null, false);
      }
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};
