const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const clucksRouter = require('./routes/clucks');
const signInRouter = require('./routes/signIn');

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
  }
  next();
});

app.use('', signInRouter);
app.use('/clucks', clucksRouter);

const PORT = 5000;
const DOMAIN = 'localhost';

app.listen(PORT, DOMAIN, () => {
  console.log(`Server is listening on ${DOMAIN}:${PORT}`);
});
