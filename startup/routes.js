import express from 'express';
import auth from '../routes/auth.js';
import lists from '../routes/lists.js';
import users from '../routes/users.js';
import catalog from '../routes/catalog.js';
import categories from '../routes/categories.js';

export default function (app) {
    app.use(express.json());
    app.use('/api/auth', auth);
    app.use('/api/lists', lists);
    app.use('/api/catalog', catalog);
    app.use('/api/categories', categories);
    app.use('/api/users', users);
}