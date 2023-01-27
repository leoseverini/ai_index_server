import express from 'express';
import db from '../data/db.js';

var router = express.Router();

/* GET all Lists */
router.get('/', async (req, res, next) => {
    const data = db.data;
    res.send({ data });
    return;
});

router.get('/list', async (req, res, next) => {
    const data = db.data;
    let retData = data.entries.map((item)=>{
        let r = {
            id: item.id,
            name: item.name,
            tags: item.tags,
            rating: item.rating,
            tumb: item.tumb
        };
        
        return r;
    });
    console.log(retData);
    res.send({ data: retData });
    return;
});

router.get('/item/:id', async (req, res, next) => {
    let id = req.params.id;

    const data = db.data;
    let retData = data.entries.find((item)=>{        
        return item.id == id;;
    });;
    console.log(retData);
    res.send({ data: retData });
    return;
});

router.get('/add', async (req, res, next) => {
    await db.data.entries.push({"Second": 333});
    await db.write();
    res.send({ data: "OK" });
});

export default router;