import express from 'express';
import { deleteFavorite, getFavorites, addFavorite } from './controller.js';

export const router = new express.Router();

router.get('/', getFavorites);
router.post('/', addFavorite);
router.delete('/', deleteFavorite);
