import express from 'express';
import { editMovie, getMovies, addMovie } from './controller.js';

export const router = new express.Router();

router.get('/', getMovies);
router.put('/', editMovie);
router.post('/', addMovie);
