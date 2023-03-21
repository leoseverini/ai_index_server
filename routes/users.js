import express from 'express';
import bcrypt from 'bcrypt';
import { Users, validate } from '../models/Users.js';
import auth from '../middleware/auth.js'

var router = express.Router();

/* GET all users */
router.get('/', auth, async (req, res, next) => {

    Users.find({}).select('-password').then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(400).send({ err: err.message });
    });

    return;
});

// POST ADD user
router.post('/', async (req, res, next) => {
    let userInfo = req.body;
    
    const { error } = validate(userInfo);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await Users.findOne({ user: req.body.user });
    if (user) return res.status(400).send('User already registered.');

    user = new Users(userInfo);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res.send(user);
    return;
});

router.get('/:id', async (req, res, next) => {
    const user = await Users.findById(req.params.id);

    if (!user) return res.status(404).send('The user with the given ID was not found.');

    res.send(user);

});


// Upadte User
router.put('/:id', async (req, res, next) => {
    const user = await Users.findById(req.params.id);
    if (!user) return res.status(404).send('The user with the given ID was not found.');

    let data = req.body;

    // const { error } = validateUpdate(data);
    // if (error) return res.status(400).send(error.details[0].message);

    console.log(data);

    const updatedUser = await Users.findByIdAndUpdate(req.params.id, data);
    res.send(updatedUser);
    return;
});

// Delete User
router.delete('/:id', async (req, res, next) => {
    const user = await Users.findById(req.params.id);

    if (!user) return res.status(404).send('The user with the given ID was not found.');

    let deletedUser = await Users.findByIdAndRemove(req.params.id);

    res.send(deletedUser);

});

export default router;