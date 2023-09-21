'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';

    return queryInterface.bulkInsert(options, [
      {
        url: 'https://png.pngtree.com/background/20230612/original/pngtree-an-example-of-a-modern-home-picture-image_3187702.jpg',
        spotId: 1,
        preview: true
      },
      {
        url: 'https://example.com/image2.jpg',
        spotId: 2,
        preview: false
      },
      {
        url: 'https://example.com/image3.jpg',
        spotId: 3,
        preview: true
      },
    ], {});

},

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
