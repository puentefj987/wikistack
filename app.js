const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '/public')));

app.listen(1337, () => console.log('listening on port 1337'));
