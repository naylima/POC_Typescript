import { Request, Response } from "express";
import { Name } from "../protocols/name.js";
import { NameSchema } from "../schemas/name.schema.js";
import { insertUnique, listMany } from "../repositories/genres.repository.js";

const insertGenre = async (req: Request, res: Response): Promise<Response> => {

    const genre = req.body as Name;
    const { error } = NameSchema.validate(genre);

    if (error) {
        return res.status(400).send({
            message: error.message
        })
    }

    try {

        await insertUnique(genre);
        return res.sendStatus(201);
        
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(500);
    }
};

const listGenres = async (req: Request, res: Response): Promise<Response> => {

    try {
        const response = await listMany();
        return res.status(200).send(response.rows);

    } catch (error) {
        console.log(error.message);
        return res.sendStatus(500);        
    }

};

export { insertGenre, listGenres };