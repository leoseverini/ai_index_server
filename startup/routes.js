import express from 'express';
import entries from '../routes/entries.js';

export default function (app) {
    app.use(express.json());
    app.use('/api/entries', entries);
}