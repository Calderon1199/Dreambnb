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
        url: 'https://media.architecturaldigest.com/photos/5a30296738bb817b7ffe1b4b/4:3/w_908,h_681,c_limit/Airbnb_Georgia3.jpg',
        spotId: 1,
        preview: true
      },
      {
        url: 'https://greenweddingshoes.com/wp-content/uploads/2021/01/ezgif.com-gif-maker-13.jpg',
        spotId: 1,
        preview: false
      },
      {
        url: 'https://hips.hearstapps.com/hmg-prod/images/airbnb-atlanta-treehouse-1532623340.jpg',
        spotId: 1,
        preview: false
      },
      {
        url: 'https://www.wellandgood.com/wp-content/uploads/2018/01/Airbnb-Secluded-Treehouse-Atlanta.jpg',
        spotId: 1,
        preview: false
      },
      {
        url: 'https://media.cntraveler.com/photos/596f917028a23949449f0499/16:9/w_1280,c_limit/5fc8b312-b262-4473-8771-69dd27909881.jpg',
        spotId: 1,
        preview: false
      },
      {
        url: 'https://www.losethemap.com/wp-content/uploads/2021/02/Joshua-Tree-UFO.jpg',
        spotId: 2,
        preview: true
      },
      {
        url: 'https://thefuturohouse.com/images/futuros/urbex_offlimits_090519_jt.jpg',
        spotId: 2,
        preview: false
      },
      {
        url: 'https://a0.muscache.com/pictures/57a113aa-57a6-4a54-b0ec-1c4e6ef70164.jpg',
        spotId: 2,
        preview: false
      },
      {
        url: 'https://a0.muscache.com/im/pictures/04d6ecc3-3f3c-4d0f-9589-19ebe3c2dc3d.jpg',
        spotId: 2,
        preview: false
      },
      {
        url: 'https://bigseventravel.com/wp-content/uploads/2020/08/Screen-Shot-2020-08-15-at-1.43.22-PM.png',
        spotId: 3,
        preview: true
      },
      {
        url: 'https://a0.muscache.com/im/pictures/b73b5d8c-44c8-4888-a8d9-e78893999038.jpg',
        spotId: 3,
        preview: false
      },
      {
        url: 'https://www.territorysupply.com/wp-content/uploads/2021/02/Tipi-In-the-Mojave-Nevada.jpg',
        spotId: 3,
        preview: false
      },
      {
        url: 'https://sp-ao.shortpixel.ai/client/q_glossy,ret_img,w_1024,h_683/http://thewanderingblonde.com/wp-content/uploads/Most-Unique-Airbnbs-in-California-3-1024x683.jpg',
        spotId: 4,
        preview: true
      },
      {
        url: 'https://miro.medium.com/v2/resize:fit:1024/1*KLCyM8Dtr9VhQInPTNczPA.jpeg',
        spotId: 4,
        preview: false
      },
      {
        url: 'https://www.livelikeitstheweekend.com/wp-content/uploads/2018/01/airbnb.jpg',
        spotId: 5,
        preview: true
      },
      {
        url: 'https://media.timeout.com/images/105686523/image.jpg',
        spotId: 6,
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
