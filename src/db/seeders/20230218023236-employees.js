'use strict';

module.exports = {
  up: async queryInterface => {
    return await queryInterface.bulkInsert('employees', [
      {
        name: 'Ryan Tan',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async queryInterface => {
    return await queryInterface.bulkDelete('employees', null, {});
  },
};
