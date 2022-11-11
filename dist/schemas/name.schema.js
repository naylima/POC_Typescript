import Joi from 'joi';
export var NameSchema = Joi.object({
    name: Joi.string().required()
});
