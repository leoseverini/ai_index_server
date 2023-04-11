import express from 'express';
import { Catalog, validate } from '../models/Catalog.js';

var router = express.Router();

/* GET all Catalog */
router.get('/', async (req, res, next) => {

    Catalog.find({}).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(400).send({ err: err.message });
    });

    return;
});

router.get('/list', async (req, res, next) => {
    Catalog.find({ enabled: true }).then((ret) => {
        let data = ret.map((item) => {
            return {
                id: item.id,
                name: item.name,
                short: item.description.substring(0, 40),
                image: item.images[0],
            }
        });

        res.send(data);
    }).catch((err) => {
        res.status(400).send({ err: err.message });
    });

    return;
});


// POST ADD Catalog
router.post('/', async (req, res, next) => {
    let data = req.body;

    const { error } = validate(data);
    if (error) return res.status(400).send(error.details[0].message);

    console.log(data);

    let catalog = new Catalog(data);
    catalog.save();
    res.send(catalog);
    return;
});

router.get('/:id', async (req, res, next) => {
    const catalog = await Catalog.findById(req.params.id);

    if (!catalog) return res.status(404).send('The Catalog with the given ID was not found.');

    res.send(catalog);

});


router.get('/index/:id', async (req, res, next) => {
    const catalog = await Catalog.findOne({ index: req.params.id });

    if (!catalog) return res.status(404).send('The Catalog with the given ID was not found.');

    res.send(catalog);

});

// Upadte Catalog
router.put('/:id', async (req, res, next) => {
    const catalog = await Catalog.findById(req.params.id);
    if (!catalog) return res.status(404).send('The catalog with the given ID was not found.');

    let data = req.body;

    // const { error } = validateUpdate(data);
    // if (error) return res.status(400).send(error.details[0].message);

    console.log(data);

    const updatedUser = await Catalog.findByIdAndUpdate(req.params.id, data);
    res.send(updatedUser);
    return;
});

router.put('/index/:id', async (req, res, next) => {
    const catalog = await Catalog.findOne({ index: req.params.id });
    if (!catalog) return res.status(404).send('The catalog with the given INDEX was not found.');

    let data = req.body;

    // const { error } = validateUpdate(data);
    // if (error) return res.status(400).send(error.details[0].message);

    console.log(data);

    const updatedUser = await Catalog.findOneAndUpdate({ index: req.params.id }, data);
    res.send(updatedUser);
    return;
});

// Delete catalog
router.delete('/:id', async (req, res, next) => {
    const catalog = await Catalog.findById(req.params.id);

    if (!catalog) return res.status(404).send('The catalog with the given ID was not found.');

    let deletedCatalog = await Catalog.findByIdAndRemove(req.params.id);

    res.send(deletedCatalog);

});

export default router;