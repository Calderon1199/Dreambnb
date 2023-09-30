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

    return queryInterface.bulkInsert(options, [
      {
        ownerId: allUsers[0].id,
        address: "123 Woods Lane",
        city: "Placerville",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "The Magic Treehouse",
        description: "Our cozy treehouse is perched among the towering oak and maple trees, providing breathtaking views of the surrounding forest. With rustic yet comfortable furnishings, you'll feel right at home in this elevated sanctuary. The spacious deck offers the perfect spot for sipping your morning coffee or stargazing at night.",
        price: 125
      },
      {
        ownerId: allUsers[0].id,
        address: "456 Elm Street",
        city: "Joshua Tree",
        state: "California",
        country: "United States of America",
        lat: 40.712776,
        lng: -74.005974,
        name: "The X-Files",
        description: "Step inside our spaceship-inspired dwelling and be transported to a realm of wonder. The circular living space boasts sleek, minimalist design with curved walls and panoramic windows that frame the breathtaking desert views. A comfortable queen-sized bed and futuristic furnishings create an ambiance that's both luxurious and extraterrestrial.",
        price: 300
      },
      {
        ownerId: allUsers[1].id,
        address: "789 Beach Road",
        city: "Reno",
        state: "Nevada",
        country: "United States of America",
        lat: 34.0522,
        lng: -118.2437,
        name: "Nomad's Nest",
        description: "Welcome to our charming Tipi Airbnb in the heart of the stunning Reno, Nevada landscape. Nestled against the backdrop of the Sierra Nevada Mountains, our cozy tipi offers a one-of-a-kind retreat for those seeking a unique blend of comfort and adventure.",
        price: 80
      },
      {
        ownerId: allUsers[3].id,
        address: "101 Forest Avenue",
        city: "Portland",
        state: "Oregon",
        country: "United States of America",
        lat: 43.6615,
        lng: -70.2553,
        name: "The Observatory",
        description: "Escape to a charming observatory-shaped house nestled in Portland's woods. This cozy retreat offers unbeatable views of the lush forest, making it an ideal haven for stargazers and nature lovers. Just a stone's throw from hiking trails and a short drive to downtown Portland, this unique getaway combines tranquility with city access. Perfect for a romantic escape or peaceful retreat, experience the magic of the Pacific Northwest from your own observatory.",
        price: 150
      },
      {
        ownerId: allUsers[4].id,
        address: "222 Crest Street",
        city: "Alpine",
        state: "Wyoming",
        country: "United States of America",
        lat: 29.9584,
        lng: -90.0648,
        name: "The Dome",
        description: "Escape to the tranquility of the woods in our enchanting clear bubble house. Immerse yourself in nature's embrace while enjoying the modern comforts of home. This unique spherical retreat offers uninterrupted views of the lush forest canopy during the day and a magical stargazing experience at night. Fall asleep under a blanket of stars and wake up to the gentle sounds of the woods. It's a perfect blend of serenity and luxury for those seeking an extraordinary getaway.",
        price: 200
      },
      {
        ownerId: allUsers[4].id,
        address: "3135 ",
        city: "Carmel By The Sea",
        state: "California",
        country: "United States of America",
        lat: 37.8267,
        lng: -122.4230,
        name: "Cottage Core",
        description: "Discover the charm of coastal living in our cozy cottage house nestled in the picturesque village of Carmel-by-the-Sea. This quaint retreat offers a perfect blend of comfort and elegance, with its inviting interiors and serene garden. Stroll along white sandy beaches, explore art galleries, and savor gourmet dining just steps away from your door. Whether you're seeking a romantic escape or a peaceful coastal adventure, our Carmel cottage is your idyllic home away from home.",
        price: 175
      }

    ], {});

},

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Stanley Park', 'Santa Monica Pier', 'Central Park', 'App Academy'] }
    }, {});
  }
};
