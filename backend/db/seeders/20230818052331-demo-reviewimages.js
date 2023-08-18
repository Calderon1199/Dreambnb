'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';

    return queryInterface.bulkInsert(options, [
      {
        url: 'https://example.com/image1.jpg',
        reviewId: 1,
      },
      {
        url: 'https://example.com/image2.jpg',
        reviewId: 2,
      },
      {
        url: 'https://example.com/image3.jpg',
        reviewId: 3,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
