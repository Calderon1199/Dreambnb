'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';

    return queryInterface.bulkInsert(options, [
      {
        userId: 3,
        spotId: 1,
        review: "This spot is amazing! I had a great time here.",
        stars: 5,
      },
      {
        userId: 3,
        spotId: 2,
        review: "Average spot, nothing too special plus they had this in the garage.",
        stars: 3,
      },
      {
        userId: 3,
        spotId: 5,
        review: "I love this place! The view is breathtaking.",
        stars: 4,
      },
      {
        userId: 1,
        spotId: 3,
        review: "I love this place! The view is breathtaking.",
        stars: 5,
      },
      {
        userId: 4,
        spotId: 1,
        review: "Great spot for a weekend getaway!",
        stars: 4,
      },
      {
        userId: 5,
        spotId: 3,
        review: "The best vacation spot ever!",
        stars: 5,
      },
      {
        userId: 1,
        spotId: 4,
        review: "Decent place, but could use some improvements.",
        stars: 3,
      },
      {
        userId: 2,
        spotId: 4,
        review: "Beautiful location, but a bit pricey.",
        stars: 4,
      },
      {
        userId: 3,
        spotId: 5,
        review: "I had an amazing time here! Highly recommend.",
        stars: 5,
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      stars: { [Op.in]: [4, 3, 5] }
    }, {});
  }
};
