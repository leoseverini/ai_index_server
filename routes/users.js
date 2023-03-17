import express from 'express';
import { Users, validate } from '../models/Users.js';

var router = express.Router();

/* GET all users */
router.get('/', async (req, res, next) => {

    Users.find({}).then((data) => {
        res.send(data);
      }).catch((err) => {
        res.status(400).send({err: err.message});
      });

    return;
});

// POST ADD user
router.post('/', async (req, res, next) => {
    let data = req.body;

    const { error } = validate(data);
    if (error) return res.status(400).send(error.details[0].message);

    console.log(data);

    let users = new Users(data);
    users.save();
    res.send(users);
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