import express from 'express';
import 'dotenv/config';
import genresRouter from './routers/genres.router.js';
import platformsRouter from './routers/platforms.router.js';
import moviesRouter from './routers/movies.router.js';

const server = express();
server.use(express.json());

server.use(genresRouter);
server.use(platformsRouter);
server.use(moviesRouter);

const port = parseInt(process.env.PORT || '4000');

server.listen(4000, () => {
    console.log(`Running on port ${port}`);
});