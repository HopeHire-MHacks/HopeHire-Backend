/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';
const fs = require('fs');

const images = [];

function readFile() {
  return new Promise((resolve, reject) => {
    fs.readFile('assets/sample_images/HRT.jpg', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(new Buffer.from(data, 'binary'));
      }
    });
  });
}

module.exports = {
  up: async queryInterface => {
    images.push(await readFile());
    return await queryInterface.bulkInsert('employers', [
      {
        name: 'Hudson River Trading',
        userId: 5,
        companyDescription:
          'Hudson River Trading is a quantitative trading firm headquartered in New York City and founded in 2002.',
        logo: images[0],
        webAddress: 'https://www.google.com/',
        latLong: [1.2833, 103.85],
        numberOfEmployees: 100,
        country: 'USA',
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        address: '123 Main St',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Acme Trading Co.',
        userId: 1,
        companyDescription:
          'Acme Trading Co. is a leading trading firm specializing in high-frequency trading.',
        logo: images[1],
        webAddress: 'https://www.amazon.com/',
        latLong: [2.283, 103.85],
        numberOfEmployees: 90,
        country: 'Australia',
        city: 'Sydney',
        state: 'NSW',
        postalCode: '2000',
        address: '111 George St',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Quantum Trading LLC',
        userId: 6,
        companyDescription:
          'Quantum Trading LLC is a quantitative trading firm that uses cutting-edge technology and data analysis to make informed trading decisions.',
        logo: images[2],
        webAddress: 'https://www.nike.com/',
        latLong: [2.2833, 103.85],
        country: 'UK',
        city: 'London',
        state: '',
        postalCode: 'WC1E 6BT',
        address: '789 Oxford St',
        numberOfEmployees: 80,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'High Frequency Trading Inc.',
        userId: 7,
        companyDescription:
          'High Frequency Trading Inc. is a global trading firm with a focus on high-frequency and algorithmic trading.',
        logo: images[3],
        webAddress: 'https://www.microsoft.com/',
        latLong: [5.4833, 103.85],
        numberOfEmployees: 70,
        country: 'Canada',
        city: 'Toronto',
        state: 'ON',
        postalCode: 'M5V 2T6',
        address: '456 Bay St',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async queryInterface => {
    return await queryInterface.bulkDelete('employers', null, {});
  },
};

[
  {
    country: 'USA',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    address: '123 Main St',
    latLong: [40.7128, -74.006],
  },
  {
    latLong: [43.6532, -79.3832],
  },
  {
    latLong: [51.5074, -0.1278],
  },
  {
    latLong: [-33.8651, 151.2099],
  },
  {
    country: 'France',
    city: 'Paris',
    state: '',
    postalCode: '75001',
    address: '222 Rue de Rivoli',
    latLong: [48.8566, 2.3522],
  },
];
