import express from 'express';
import path from 'node:path';
import indexRouter from './routes/indexRouter.js';

const app = express();
const PORT = process.env.PORT || '3000';

app.set('views', path.join(process.cwd(), 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(process.cwd(), 'public')));
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);

app.listen(PORT, (error) => {
  if (error) throw error;
  console.log('Listening on PORT:', PORT);
});
