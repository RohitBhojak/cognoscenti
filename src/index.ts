import express from 'express';
import path from 'node:path';
import indexRouter from './routes/indexRouter.js';
import * as icons from 'lucide-static';
import renderViewMiddleware from './middlewares/renderView.js';
import session from 'express-session';
import passport from 'passport';
import { configurePassport } from './config/passport.js';
import redirectMiddleware from './middlewares/redirect.js';
import setUser from './middlewares/setUser.js';

const app = express();
const PORT = process.env.PORT || '3000';
const secret = process.env.SESSION_SECRET || 'session_secret_key';

app.set('views', path.join(process.cwd(), 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(process.cwd(), 'public')));
app.use(express.urlencoded({ extended: true }));

configurePassport();

app.use(session({ secret, resave: false, saveUninitialized: false }));
app.use(passport.session());

app.locals.icons = icons;
app.use(setUser);

app.use(renderViewMiddleware);
app.use(redirectMiddleware);

app.use('/', indexRouter);

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
