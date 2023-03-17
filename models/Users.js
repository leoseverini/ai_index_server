import Joi from 'joi';
import mongoose from 'mongoose'

const UsersSchema = new mongoose.Schema({
    user: { type: String, default: '', maxlength: 20, trim: true, required: true },
    name: { type: String, default: '', maxlength: 64, trim: true, required: true },
    email: { type: String, default: '', maxlength: 128, trim: true },
    telephone: { type: String, default: '', maxlength: 32, trim: true },
    password: { type: String, default: '', maxlength: 20, trim: true },
    type: { type: Number, default: 0 }, // Admin - User
    avatar: { type: String, default: '', maxlength: 256, trim: true },
});

function validateFunction(course) {
    const schema = Joi.object({
        user: Joi.string().min(3).max(20).required(),
        name: Joi.string().min(3).max(64).required(),
        email: Joi.string().max(128),
        telephone: Joi.string().max(32).required(),
        password: Joi.string().max(20),
        type: Joi.number(),
        avatar: Joi.string().max(256)
    });

    return schema.validate(course);
}

export const Users = mongoose.model('Users', UsersSchema);
export const validate = validateFunction;
