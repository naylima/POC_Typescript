import express from 'express';
import * as genreController from "../controllers/genres.controller.js";
var router = express.Router();
router.post('/genre', genreController.insertGenre);
router.get('/genres', genreController.listGenres);
export default router;
