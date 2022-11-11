import { Request, Response } from "express";
import { Name } from "../protocols/name.js";
import { Movie, MovieEntity } from "../protocols/movie.js";
import { MovieSchema } from "../schemas/movie.schema.js";
import * as moviesRepository from "../repositories/movies.repository.js";
import { checkGenre } from "../repositories/genres.repository.js";
import { checkPlatform } from "../repositories/platforms.repository.js";


const insertMovie = async (req: Request, res: Response): Promise<Response> => {

    const movie = req.body as Movie;
    const { error } = MovieSchema.validate(movie);

    if (error) {
        return res.status(422).send({
            message: error.message
        })
    }

    try {

        const genre = await checkGenre(movie.genreId);
        const platform = await checkPlatform(movie.platformId);

        if(genre.rowCount === 0 || platform.rowCount === 0) {
            return res.sendStatus(400);
        }

        await moviesRepository.insertUnique(movie);
        return res.sendStatus(201);
        
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(500);
    }
};

const listMovies = async (req: Request, res: Response): Promise<Response> => {

    try {
        const response = await moviesRepository.listMany();
        return res.status(200).send(response.rows);

    } catch (error) {
        console.log(error.message);
        return res.sendStatus(500);        
    }

};

const updateStatus = async (req: Request, res: Response): Promise<Response> => {

    const id = Number(req.params.id);
    const status = req.body as Name;

    try {
        const checkMovie = await moviesRepository.listUnique(id);
        
        if (checkMovie.rowCount === 0) {
            return res.sendStatus(400);
        }

        await moviesRepository.updateStatus(status, id);
        return res.sendStatus(200);
        
    } catch (error) { 
        console.log(error.message);
        return res.sendStatus(500);  
    }

};

const updateMovie = async (req: Request, res: Response): Promise<Response> => {

    const id = Number(req.params.id);
    const movie = req.body as MovieEntity;

    const { error } = MovieSchema.validate(movie);

    if (error) {
        return res.status(422).send({
            message: error.message
        })
    }


    try {
        const checkMovie = await moviesRepository.listUnique(id);
        
        if (checkMovie.rowCount === 0) {
            return res.sendStatus(404);
        }

        if (checkMovie.rows[0].status === "watched") {
            await moviesRepository.updateUnique(movie, id); 
            return res.sendStatus(200); 
        }

        return res.sendStatus(401);
        
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(500);  
    }

};

const deleteMovie = async (req: Request, res: Response): Promise<Response> => {

    const id: number = Number(req.params.id);

    try {
        const checkMovie = await moviesRepository.listUnique(id);
        
        if (checkMovie.rowCount === 0) {
            return res.sendStatus(404);
        }

        await moviesRepository.deleteUnique(id);
        return res.sendStatus(200);
        
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(500);  
    }

};

export { 
    insertMovie, 
    listMovies, 
    updateStatus, 
    updateMovie,
    deleteMovie,
};