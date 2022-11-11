import express from 'express';
import * as moviesController from '../controllers/movies.controller.js';
var router = express.Router();
router.post('/movies', moviesController.insertMovie);
router.get('/movies', moviesController.listMovies);
router.put('/movies/status/:id', moviesController.updateStatus);
router.put('/movies/:id', moviesController.updateMovie);
router["delete"]('/movies/:id', moviesController.deleteMovie);
export default router;
