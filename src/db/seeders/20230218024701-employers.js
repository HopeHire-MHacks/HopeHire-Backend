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
        address:
          '10 Collyer Quay, #06-07 Ocean Financial Centre, Singapore 049315',
        latLong: [1.2833, 103.85],
        numberOfEmployees: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Acme Trading Co.',
        userId: 1,
        companyDescription:
          'Acme Trading Co. is a leading trading firm specializing in high-frequency trading.',
        logo: images[1],
        address: '20 Raffles Place, #15-02, Singapore 048616',
        latLong: [2.283, 103.85],
        numberOfEmployees: 90,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Quantum Trading LLC',
        userId: 6,
        companyDescription:
          'Quantum Trading LLC is a quantitative trading firm that uses cutting-edge technology and data analysis to make informed trading decisions.',
        logo: images[2],
        address: '30 Cecil Street, #17-08 Prudential Tower, Singapore 049712',
        latLong: [2.2833, 103.85],
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
        address:
          '1 Raffles Place, #44-02 One Raffles Place Tower 2, Singapore 048616',
        latLong: [5.4833, 103.85],
        numberOfEmployees: 70,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async queryInterface => {
    return await queryInterface.bulkDelete('employers', null, {});
  },
};
