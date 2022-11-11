import 'dotenv/config';
import pkg from 'pg';
var Pool = pkg.Pool;
var databaseConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
};
var connection = new Pool(databaseConfig);
export { connection };
