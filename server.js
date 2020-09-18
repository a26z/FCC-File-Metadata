'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const cors = require('cors');
const multer = require('multer');

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.get('/', function(req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/hello', function(req, res) {
    res.json({
        greetings: "Hello, API"
    });
});

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, `${process.cwd()}/storage`)
    },
    filename: function(req, file, callback) {
        callback(null, `${file.fieldname}-${Date().toString()}`)
    }
});
const upload = multer({
    storage: storage
});

app.post('/api/fileanalyse', upload.single('upfile'), function(req, res) {
    const file = req.file;
    res.json(file);
});

app.listen(process.env.PORT || 3000, function() {
    console.log(`Node.js listening on port ${PORT}, -----> ${BASE_URL}`);
});
