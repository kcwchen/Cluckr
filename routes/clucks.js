const express = require('express');
const knex = require('../db/client');

const router = express.Router();

// Get all clucks
router.get('/', (req, res) => {
  knex('tags')
    .orderBy('counter', 'desc')
    .then((data) => {
      const tags = data;
      knex('clucks')
        .orderBy('created_at', 'desc')
        .then((data) => {
          const current_time = Date.now();
          let time_passed;
          data.forEach((item) => {
            const ms = current_time - item.created_at;
            if (ms > 31536000000) {
              const years = Math.floor(ms / 31536000000);
              time_passed = `${
                years === 1 ? `${years} year` : `${years} years`
              } ago`;
            } else if (ms > 2628000000) {
              const months = Math.floor(ms / 2628000000);
              time_passed = `${
                months === 1 ? `${months} month` : `${months} months`
              } ago`;
            } else if (ms > 86400000) {
              const days = Math.floor(ms / 86400000);
              time_passed = `${
                days === 1 ? `${days} day` : `${days} days`
              } ago`;
            } else if (ms > 3600000) {
              const hours = Math.floor(ms / 3600000);
              time_passed = `${
                hours === 1 ? `${hours} hour` : `${hours} hours`
              } ago`;
            } else if (ms > 60000) {
              const minutes = Math.floor(ms / 60000);
              time_passed = `${
                minutes === 1 ? `${minutes} minute` : `${minutes} minutes`
              } ago`;
            } else {
              time_passed = 'Just now';
            }
            item['time_passed'] = time_passed;
          });
          res.render('clucks/clucks_index', { clucks: data, tags: tags });
        });
    });
});

// Make a new cluck
router.get('/new', (req, res) => {
  res.render('clucks/new', { signed_in: true });
});

router.post('/', (req, res) => {
  if (res.locals.username === '') {
    res.render('clucks/new', { signed_in: false });
  } else {
    const content = req.body.content;
    const tags_from_cluck = content.match(/[#]+[A-Za-z0-9-_]+/g);
    const tags_in_db = [];
    const existing_tags = [];

    knex('tags')
      .then((data) => {
        data.forEach((item) => {
          tags_in_db.push({ tag: item.tag, counter: item.counter });
          existing_tags.push(item.tag);
        });
      })
      .then(() => {
        if (tags_from_cluck !== null) {
          knex('clucks')
            .insert({
              username: res.locals.username,
              image_url: req.body.image_url,
              content: req.body.content,
            })
            .then(() => {
              Promise.all(
                tags_from_cluck.map((tag) => {
                  if (existing_tags.includes(tag)) {
                    return knex('tags')
                      .where('tag', tag)
                      .update({
                        counter:
                          tags_in_db.find((item) => item.tag === tag).counter +
                          1,
                      });
                  } else {
                    return knex('tags').insert({ tag: tag, counter: 1 });
                  }
                })
              ).then(() => {
                res.redirect('/clucks');
              });
            });
        } else {
          knex('clucks')
            .insert({
              username: res.locals.username,
              image_url: req.body.image_url,
              content: req.body.content,
            })
            .then(() => {
              res.redirect('./clucks');
            });
        }
      });
  }
});

module.exports = router;
