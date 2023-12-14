import express from 'express';
import { getMovies } from './controller.js';

export const router = new express.Router();

router.get('/', getMovies);
