import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import GoogleOidcStrategy from 'passport-google-oidc';
import { getUserById, getUserByUsername, insertUser } from '../models/UserRepository.js';
import bcrypt from 'bcrypt';
import {
  getFederatedCredentialByProviderAndSubject,
  insertFederatedCredential,
} from '../models/federatedCredentialsRepository.js';
import generateUniqueUsername from '../utils/generateUniqueUsername.js';

const googleClientID = process.env.GOOGLE_CLIENT_ID as string;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET as string;

export const configurePassport = (): void => {
  // Local Strategy config
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await getUserByUsername(username);
        if (!user) {
          return done(null, false, { message: 'Incorrect username', field: 'username' });
        }
        if (user.password === null)
          return done(null, false, {
            message:
              'This account was registered using a third-party service (like Google). Please sign in using that provider',
            field: 'password',
          });
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
          return done(null, false, { message: 'Incorrect password', field: 'password' });
        }
        return done(null, user);
      } catch (err) {
        done(err);
      }
    })
  );

  // google oAuth2.0 strategy config
  passport.use(
    new GoogleOidcStrategy(
      {
        clientID: googleClientID,
        clientSecret: googleClientSecret,
        callbackURL: '/auth/google/redirect',
        scope: ['email'],
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async (issuer: any, profile: any, cb: any) => {
        try {
          const email = profile?.emails?.[0]?.value;
          if (!email) return cb(new Error('No email found in Google profile'));

          const cred = await getFederatedCredentialByProviderAndSubject(issuer, profile.id);

          if (cred) {
            const user = await getUserById(cred.user_id);
            return cb(null, user);
          }

          const username = await generateUniqueUsername(email);

          const user = await insertUser({ username, password: null, is_admin: false });

          await insertFederatedCredential({
            user_id: user.id,
            provider: issuer,
            subject: profile.id,
          });

          return cb(null, user);
        } catch (err) {
          return cb(err);
        }
      }
    )
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
    } catch (err) {
      done(err);
    }
  });
};
