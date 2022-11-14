import { connection } from "../database/database.js";
import { QueryResult } from 'pg';
import { Name } from "../protocols/name.js";
import { PlatformEntity } from "../protocols/platform.js";

const TABLE = "platforms";

async function insertUnique (platform: Name) {

    const response: QueryResult = await connection.query(
        `INSERT INTO ${TABLE} ("name") VALUES ($1);`, [platform.name]
    );

    return response;
};

async function listMany (): Promise<QueryResult<PlatformEntity>> {

    const response: QueryResult  = await connection.query(
        `
            SELECT
                platforms.id,
                platforms.name AS platform,
                COUNT(movies."platformId") AS movies 
            FROM platforms
            LEFT JOIN movies
            ON movies."platformId" = platforms.id
            GROUP BY platform, platforms.id
        ;`
    );

    return response;
};

async function checkPlatform (id: number) {
    const response: QueryResult = await connection.query(
        `SELECT * FROM ${TABLE} WHERE id = $1;`, [id]
    );

    return response;
};

export { insertUnique, listMany, checkPlatform };