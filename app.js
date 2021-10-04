const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const clucksRouter = require('./routes/clucks');

const app = express();
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Custom middleware for cookies
app.use((req, res, next) => {
  const username = req.cookies.username;
  res.locals.username = '';
  if (username) {
    res.locals.username = username;
    console.log(`Signed in as ${username}`);
  }
  next();
});

app.get('/', (req, res) => {
  res.redirect('/clucks');
});

app.get('/sign_in', (req, res) => {
  res.render('sign_in');
});

app.post('/sign_in', (req, res) => {
  const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24;
  const username = req.body.username;
  res.cookie('username', username, { maxAge: COOKIE_MAX_AGE });
  res.redirect('/');
});

app.post('/sign_out', (req, res) => {
  res.clearCookie('username');
  res.redirect('/');
});

app.use('/clucks', clucksRouter);

const PORT = 5000;
const DOMAIN = 'localhost';

app.listen(PORT, DOMAIN, () => {
  console.log(`Server is listening on ${DOMAIN}:${PORT}`);
});
