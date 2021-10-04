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

// Make a new cluck
router.get('/new', (req, res) => {
  res.render('clucks/new');
});

router.post('/', (req, res) => {
  console.log(req.body);
  knex('clucks')
    .insert({
      username: res.locals.username,
      image_url: req.body.image_url,
      content: req.body.content,
    })
    .then(() => {
      res.redirect('/clucks');
    });
});

module.exports = router;
