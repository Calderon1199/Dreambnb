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
        url: 'https://cdn1.matadornetwork.com/blogs/1/2018/05/treehouseheader-copy-1200x846.jpg',
        reviewId: 2,
      },
      {
        url: 'https://i2-prod.mirror.co.uk/incoming/article31009784.ece/ALTERNATES/s1200c/0_Non-human-alien-corpses-are-displayed-to-the-media-in-Mexico-City.jpg',
        reviewId: 1,
      },
      {
        url: 'https://dsk4t6ov5vq8n.cloudfront.net/uploads/PBS-Articles/2022/The-Green-Planet/Episode-4-photos/Sized-photos/The_Green_Planet_04_010.jpg',
        reviewId: 3,
      },
      {
        url: 'https://metroparkstoledofoundation.org/media/6491/treehouse-village-header-image-1400x700.jpg',
        reviewId: 5,
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
