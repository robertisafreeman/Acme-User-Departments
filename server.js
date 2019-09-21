const express = require('express');
const app = express();
const db = require('./db');
const { conn } = db;
const path = require('path');

const port = process.env.PORT || 3000;

app.get('/api/users', async (req, res, next)=> {
    try{
        res.send(await db.findAllUsers());
    }
    catch(ex) {
        next(ex);
    }
});

db.syncOrSwim()
    .then(() => {
        app.listen( port, ()=> console.log(`listening on port ${port}`))
});
