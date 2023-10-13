const express = require('express');
const path = require('path');
const app = express();
const port = 8080;
const mongo = require('./db');
const search = require('./routes/search.js');
const history = require('./routes/history.js');

app.use(express.static('public'));

app.use('/search', search);
app.use('/history', history);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/Search.html'));
});
app.get('/History', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/History.html'));
});
app.get('/API', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/API.html'));
});
app.get('/List', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/API.html'));
});

app.listen(port, async () => {
    console.log(`Server is listening on port ${port}`);
    await mongo.connect();
});

