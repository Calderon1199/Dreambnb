'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';

    await queryInterface.bulkInsert(options, [
      {
        address: "123 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 123
      },
      {
        address: "456 Elm Street",
        city: "New York",
        state: "New York",
        country: "United States of America",
        lat: 40.712776,
        lng: -74.005974,
        name: "Central Park",
        description: "Iconic urban park in Manhattan",
        price: 321
      },
      {
        address: "789 Beach Road",
        city: "Los Angeles",
        state: "California",
        country: "United States of America",
        lat: 34.0522,
        lng: -118.2437,
        name: "Santa Monica Pier",
        description: "Famous pier with amusement park attractions",
        price: 98
      },
      {
        address: "101 Nature Trail",
        city: "Vancouver",
        state: "British Columbia",
        country: "Canada",
        lat: 49.2827,
        lng: -123.1207,
        name: "Stanley Park",
        description: "Large urban park with scenic views and trails",
        price: 199
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Stanley Park', 'Santa Monica Pier', 'Central Park', 'App Academy'] }
    }, {});
  }
};
