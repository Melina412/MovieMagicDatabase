import express from 'express';
import { editMovie, getMovies } from './controller.js';

export const router = new express.Router();

router.get('/', getMovies);
router.put('/', editMovie);
