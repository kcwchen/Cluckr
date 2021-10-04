const faker = require('faker');
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('clucks')
    .del()
    .then(function () {
      // Inserts seed entries
      const clucks = [];
      for (let i = 0; i < 10; i++) {
        clucks.push({
          username: faker.internet.userName(),
          image_url: faker.image.imageUrl(),
          content: faker.lorem.paragraphs(),
        });
      }
      return knex('clucks').insert(clucks);
    });
};
