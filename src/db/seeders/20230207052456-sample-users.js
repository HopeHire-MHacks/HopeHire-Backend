/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const bcrypt = require('bcrypt');
const saltRounds = 10;

function hashPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(saltRounds));
}

module.exports = {
  up: async queryInterface => {
    return await queryInterface.bulkInsert('users', [
      {
        email: 'admin@example.com',
        password: hashPassword('asdasd'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'ryantan@gmail.com',
        password: hashPassword('asdasd'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'john.doe@example.com',
        password: hashPassword('password123'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'jane.doe@gmail.com',
        password: hashPassword('securepassword'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'contact@hudsonrivertrading.com',
        password: hashPassword('trading123'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'info@example.com',
        password: hashPassword('information'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'support@gmail.com',
        password: hashPassword('helpme'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async queryInterface => {
    return await queryInterface.bulkDelete('users', null, {});
  },
};
