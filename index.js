import * as dotenv from 'dotenv' 
dotenv.config();

import express, { json } from 'express';
import initDb from './startup/db.js';
import routes from './startup/routes.js';

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static('public'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.use(json());

routes(app);

initDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server Started at ${PORT}`);
    });
});