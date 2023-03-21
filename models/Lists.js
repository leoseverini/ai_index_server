import Joi from 'joi';
import mongoose from 'mongoose'

const ListsSchema = new mongoose.Schema({
    name: { type: String, default: '', maxlength: 64, trim: true, required: true },
    type: { type: Number, default: 0, min: 0, max: 999 }
});

function validateFunction(list) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(64).required(),
        type: Joi.number().min(0).max(999),
    });

    return schema.validate(list);
}

export const Lists = mongoose.model('List', ListsSchema);
export const validate = validateFunction;
