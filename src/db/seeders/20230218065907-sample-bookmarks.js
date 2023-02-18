'use strict';

module.exports = {
  up: async queryInterface => {
    return await queryInterface.bulkInsert('bookmarks', [
      {
        employeeId: 1,
        jobId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async queryInterface => {
    return await queryInterface.bulkDelete('bookmarks', null, {});
  },
};
