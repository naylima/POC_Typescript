import { connection } from "../database/database.js";
import { QueryResult } from 'pg';
import { Name } from "../protocols/name.js";
import { Movie, MovieEntity } from "../protocols/movie.js";

const TABLE = "movies";

async function insertUnique (movie: Movie): Promise<QueryResult<Movie>> {

    const response: QueryResult = await connection.query(
        `
            INSERT INTO ${TABLE} 
            ("name", "platformId", "genreId", "status") 
            VALUES ($1, $2, $3, $4);
        `, 
        [movie.name, movie.platformId, movie.genreId, movie.status]
    );

    return response;
};

async function listMany (): Promise<QueryResult<MovieEntity>> {

    const response: QueryResult  = await connection.query(
        `SELECT * FROM ${TABLE};`
    );

    return response;
};

async function listUnique (id: number): Promise<QueryResult<MovieEntity>>  {

    const response: QueryResult  = await connection.query(
        `SELECT * FROM ${TABLE} WHERE id = $1;`,
        [id]
    );

    return response;
};

async function updateStatus(status: Name, id: number) {

    const response: QueryResult  = await connection.query(
        `UPDATE ${TABLE} SET "status" = $1 WHERE id = $2;`,
        [status.name, id]
    );

    return response;
};

async function updateUnique(movie: MovieEntity, id: number) {

    const response: QueryResult  = await connection.query(
        `UPDATE ${TABLE} SET "rate" = $1, "review" = $2 WHERE id = $3;`,
        [movie.rate, movie.review, id]
    );

    return response;
};

async function deleteUnique(id: number) {
    
    const response: QueryResult  = await connection.query(
        `DELETE FROM ${TABLE} WHERE id = $1;`,
        [id]
    );

    return response;
};

export { 
    insertUnique, 
    listMany,
    listUnique,
    updateStatus, 
    updateUnique,
    deleteUnique
 };