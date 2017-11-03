// non-async.ts
import express = require('express');
import fs = require('fs');
import path = require('path');

const app = express();

app.get('/', (req, res) => {
    fs.readFile(path.join(__dirname, 'demo.html'), 'utf8', (err, data) => {
        res.send(data);
    });
});

app.listen(3000);
