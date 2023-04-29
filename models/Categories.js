import Joi from 'joi';
import mongoose from 'mongoose'

const CategoriesSchema = new mongoose.Schema({
    name: { type: String, default: '', maxlength: 64, trim: true, required: true },
    tags: [{ type: String, default: '', maxlength: 32, trim: true }],
});

function validateFunction(list) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(64).required(),
        tags: Joi.array(),
    });

    return schema.validate(list);
}

export const Categories = mongoose.model('Categories', CategoriesSchema);
export const validate = validateFunction;
