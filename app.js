const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

const app = express();
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/sign_in', (req, res) => {
  res.render('sign_in');
});

const PORT = 5000;
const DOMAIN = 'localhost';

app.listen(PORT, DOMAIN, () => {
  console.log(`Server is listening on ${DOMAIN}:${PORT}`);
});
