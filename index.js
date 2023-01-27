import express, { json } from 'express';
import routes from './startup/routes.js';

const app = express()
const PORT = process.env.PORT || 3000

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.use(json());

routes(app);

app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
})
