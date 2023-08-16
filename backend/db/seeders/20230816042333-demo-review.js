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
        userId: 1,
        spotId: 1,
        review: "This spot is amazing! I had a great time here.",
        stars: 5,
      },
      {
        userId: 2,
        spotId: 1,
        review: "Average spot, nothing too special.",
        stars: 3,
      },
      {
        userId: 3,
        spotId: 2,
        review: "I love this place! The view is breathtaking.",
        stars: 4,
      },
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
