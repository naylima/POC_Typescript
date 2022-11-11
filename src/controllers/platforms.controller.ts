import { Request, Response } from "express";
import { Name } from "../protocols/name.js";
import { NameSchema } from "../schemas/name.schema.js";
import { insertUnique, listMany } from "../repositories/platforms.repository.js";

const insertPlatform = async (req: Request, res: Response): Promise<Response> => {

    const platform = req.body as Name;
    const { error } = NameSchema.validate(platform);

    if (error) {
        return res.status(400).send({
            message: error.message
        })
    }

    try {

        await insertUnique(platform);
        return res.sendStatus(201);
        
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(500);
    }
};

const listPlatforms = async (req: Request, res: Response): Promise<Response> => {

    try {      
        const response = await listMany();
        return res.status(200).send(response.rows);

    } catch (error) {   
        console.log(error.message);
        return res.sendStatus(500);        
    }

};

export { insertPlatform, listPlatforms };