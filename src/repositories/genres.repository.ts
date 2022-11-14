import { connection } from "../database/database.js";
import { QueryResult } from 'pg';
import { Name } from "../protocols/name.js";
import { GenreEntity } from "../protocols/genre.js";

const TABLE = "genres";

async function insertUnique (genre: Name) {

    const response: QueryResult = await connection.query(
        `INSERT INTO ${TABLE} ("name") VALUES ($1);`, [genre.name]
    );

    return response;
};

async function listMany (): Promise<QueryResult<GenreEntity>> {

    const response: QueryResult  = await connection.query(
        `
            SELECT
                genres.id,
                genres.name AS genre,
                COUNT(movies."genreId") AS movies 
            FROM genres
            LEFT JOIN movies
            ON movies."genreId" = genres.id
            GROUP BY genre, genres.id
        ;`
    );

    return response;
};

async function checkGenre (id: number) {
    const response: QueryResult = await connection.query(
        `SELECT * FROM ${TABLE} WHERE id = $1;`, [id]
    );

    return response;
};

export { insertUnique, listMany, checkGenre };
