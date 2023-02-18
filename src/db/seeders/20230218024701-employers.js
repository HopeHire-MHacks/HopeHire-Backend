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
    console.log(images[0]);
    return await queryInterface.bulkInsert('employers', [
      {
        name: 'Hudson River Trading',
        userId: 3,
        companyDescription:
          'Hudson River Trading is a quantitative trading firm headquartered in New York City and founded in 2002.',
        logo: images[0],
        address:
          '10 Collyer Quay, #06-07 Ocean Financial Centre, Singapore 049315',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async queryInterface => {
    return await queryInterface.bulkDelete('employers', null, {});
  },
};
