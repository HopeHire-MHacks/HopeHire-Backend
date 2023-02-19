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
        email: 'jane.doe@example.com',
        password: hashPassword('p@ssw0rd'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'test@example.com',
        password: hashPassword('test123'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'user@example.com',
        password: hashPassword('password'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'hello@example.com',
        password: hashPassword('hello123'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'world@example.com',
        password: hashPassword('world123'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'foo@example.com',
        password: hashPassword('foo123'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'bar@example.com',
        password: hashPassword('bar123'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'testuser@example.com',
        password: hashPassword('testuser123'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'admin123@example.com',
        password: hashPassword('admin123'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'user123@example.com',
        password: hashPassword('user123'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'test123@example.com',
        password: hashPassword('test123'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'testuser123@example.com',
        password: hashPassword('testuser123'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'john123@example.com',
        password: hashPassword('john123'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'jane123@example.com',
        password: hashPassword('jane123'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'foo123@example.com',
        password: hashPassword('foo123'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'bar123@example.com',
        password: hashPassword('bar123'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'hello123@example.com',
        password: hashPassword('hello123'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'world123@example.com',
        password: hashPassword('world123'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'testuser1@example.com',
        password: hashPassword('testuser1'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'testuser2@example.com',
        password: hashPassword('testuser2'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'testuser3@example.com',
        password: hashPassword('testuser3'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'testuser4@example.com',
        password: hashPassword('testuser4'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'testuser5@example.com',
        password: hashPassword('testuser5'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'testuser6@example.com',
        password: hashPassword('testuser6'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'testuser7@example.com',
        password: hashPassword('testuser7'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'testuser8@example.com',
        password: hashPassword('testuser8'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'testuser9@example.com',
        password: hashPassword('testuser9'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'testuser10@example.com',
        password: hashPassword('testuser10'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'testuser11@example.com',
        password: hashPassword('testuser11'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'testuser12@example.com',
        password: hashPassword('testuser12'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'testuser13@example.com',
        password: hashPassword('testuser13'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'testuser14@example.com',
        password: hashPassword('testuser14'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'testuser15@example.com',
        password: hashPassword('testuser15'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'testuser16@example.com',
        password: hashPassword('testuser16'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'testuser17@example.com',
        password: hashPassword('testuser17'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'testuser18@example.com',
        password: hashPassword('testuser18'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async queryInterface => {
    return await queryInterface.bulkDelete('users', null, {});
  },
};
