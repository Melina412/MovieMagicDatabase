import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { router as movieRouter } from './movies/router.js';
import { router as favRouter } from './favorites/router.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/movies', movieRouter);
app.use('/api/favorites', favRouter);

app.listen(process.env.PORT, () =>
  console.log('express läuft auf port:', process.env.PORT)
);
