import express from 'express';
import catalog from '../routes/catalog.js';
import users from '../routes/users.js';

export default function (app) {
    app.use(express.json());
    app.use('/api/catalog', catalog);
    app.use('/api/users', users);
}