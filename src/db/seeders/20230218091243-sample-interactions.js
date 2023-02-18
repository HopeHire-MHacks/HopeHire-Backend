'use strict';

module.exports = {
  up: async queryInterface => {
    return await queryInterface.bulkInsert('interactions', [
      {
        interactorId: 1,
        interfaceId: 1,
        isEmployer: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async queryInterface => {
    return await queryInterface.bulkDelete('interactions', null, {});
  },
};
