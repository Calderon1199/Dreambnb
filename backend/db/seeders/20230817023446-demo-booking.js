'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings';

    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        startDate: '2023-08-15',
        endDate: '2023-08-20',
      },
      {
        spotId: 2,
        userId: 2,
        startDate: '2023-09-01',
        endDate: '2023-09-10',
      },
      {
        spotId: 3,
        userId: 3,
        startDate: '2023-1-21',
        endDate: '2023-10-20',
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
