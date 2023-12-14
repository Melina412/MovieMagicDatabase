import express from 'express';
import { deleteFavorite, getFavorites, setFavorite } from './controller.js';

export const router = new express.Router();

router.get('/', getFavorites);
router.post('/', setFavorite);
router.delete('/', deleteFavorite);
