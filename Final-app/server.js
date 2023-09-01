const express = require('express');
const path = require('path');

const app = express();
const port = 8888;

const mongo = require('./db');

app.use('/', express.static(path.join(__dirname, './client')));

const search = require('./routes/search.js');
app.use('/search', search);

const history = require('./routes/history.js');
app.use('/history', history)

app.listen(port, async () => {
    console.log(`Server is listening on port ${port}`);
    await mongo.connect();
});