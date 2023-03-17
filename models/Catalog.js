import Joi from 'joi';
import mongoose from 'mongoose'

const CatalogSchema = new mongoose.Schema({    
    name: { type: String, default: '', maxlength: 64, trim: true, required: true },
    link: { type: String, default: '', maxlength: 256, trim: true },
    short: { type: String, default: '', maxlength: 256, trim: true },
    description: { type: String, default: '' },    
    models: [{ type: String, default: '', maxlength: 32, trim: true }],
    categories: [{ type: String, default: '', maxlength: 256, trim: true }],
    features: [{ type: String, default: '', maxlength: 256, trim: true }],
    haveApi: { type: String, default: '' },
    images: [{ type: String, default: '', maxlength: 256, trim: true }],
    tags: [{ type: String, default: '', maxlength: 32, trim: true }],
});

function validateFunction(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(64).required(),
        link: Joi.string().max(256),
        short: Joi.string().max(256),
        description: Joi.string(),
        models: Joi.array(),
        categories: Joi.array(),
        features: Joi.array(),
        haveApi: Joi.boolean(),
        images: Joi.array(),
        tags: Joi.array(),
    });

    return schema.validate(course);
}

export const Catalog = mongoose.model('Catalog', CatalogSchema);
export const validate = validateFunction;
