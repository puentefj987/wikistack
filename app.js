const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const models = require('./models');

const app = express();

// templating boilerplate setup
app.engine('html', nunjucks.render); // how to render html templates
app.set('view engine', 'html'); // what file extension do our templates have
nunjucks.configure('views', { noCache: true }); // where to find the views, caching off

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

app.use('/', routes);

app.use(express.static(path.join(__dirname, '/public')));

models.db.sync()
.then(() => {app.listen(1337, () => console.log('listening on port 1337'))})
.catch(console.error);
