const express = require('express');
const path = require('path');
const logger = require('morgan');

const app = express();
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

const PORT = 5000;
const DOMAIN = 'localhost';

app.listen(PORT, DOMAIN, () => {
  console.log(`Server is listening on ${DOMAIN}:${PORT}`);
});
