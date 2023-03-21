import express from 'express';
import bcrypt from 'bcrypt';
import { Users } from '../models/Users.js';
import Joi from 'joi';

var router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await Users.findOne({ user: req.body.user });
    if (!user) return res.status(400).send('Invalid username or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        console.log('User Invalid Password');
        return res.status(400).send('Invalid username or password.');
    }

    const token = user.generateAuthToken();
    res.send(
        {
            token: token,
            id: user._id,
            name: user.name,
            avatar: user.avatar
        });
});

function validate(req) {
    const schema = Joi.object({
        user: Joi.string().min(3).max(30).required(),
        password: Joi.string().min(3).max(255).required()
    });

    return schema.validate(req);
}


export default router;