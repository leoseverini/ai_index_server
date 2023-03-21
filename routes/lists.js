import express from 'express';
import bcrypt from 'bcrypt';
import { Lists, validate } from '../models/Lists.js';
import auth from '../middleware/auth.js'

var router = express.Router();

/* GET all lists */
router.get('/', async (req, res, next) => {
    Lists.find({}).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(400).send({ err: err.message });
    });

    return;
});

// POST ADD list
router.post('/', async (req, res, next) => {
    let itemInfo = req.body;
    const { error } = validate(itemInfo);
    if (error) return res.status(400).send(error.details[0].message);
    const item = new Lists(itemInfo);
    await item.save();
    res.send(item);
    return;
});

// Delete Item from list
router.delete('/:id', async (req, res, next) => {
    const item = await Lists.findById(req.params.id);
    if (!user) return res.status(404).send('The item with the given ID was not found.');

    let deletedItem = await Lists.findByIdAndRemove(req.params.id);
    res.send(deletedItem);

});

export default router;