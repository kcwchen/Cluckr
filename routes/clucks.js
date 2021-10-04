const express = require('express');
const knex = require('../db/client');

const router = express.Router();

// Get all clucks
router.get('/', (req, res) => {
  knex('clucks')
    .orderBy('created_at')
    .then((data) => {
      res.render('clucks/clucks_index', { clucks: data });
    });
});

module.exports = router;
