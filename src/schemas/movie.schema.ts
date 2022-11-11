import Joi from 'joi';

export const MovieSchema = Joi.object({
    name: Joi.string().required(),
    platformId: Joi.number().required(), 
    genreId: Joi.number().required(), 
    status: Joi.string().required(),
    rate: Joi.number().min(0).max(10),
    review: Joi.string().min(3)
})