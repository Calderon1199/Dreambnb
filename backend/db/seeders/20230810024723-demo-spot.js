'use strict';
const { User } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';

    const allUsers = await User.findAll();

    if (!allUsers.length) {
      throw new Error('No users found.');
    }

    const spotData = [
      {
        ownerId: allUsers[0].id, // Assign the first user as owner
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
        ownerId: allUsers[1].id, // Assign the second user as owner
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
        ownerId: allUsers[2].id, // Assign the third user as owner
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
      // Add more spot objects here
    ];

    return queryInterface.bulkInsert(options, spotData, {});

},

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Stanley Park', 'Santa Monica Pier', 'Central Park', 'App Academy'] }
    }, {});
  }
};
