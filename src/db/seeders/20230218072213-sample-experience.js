'use strict';

module.exports = {
  up: async queryInterface => {
    return await queryInterface.bulkInsert('experiences', [
      {
        company: 'Google',
        position: 'Software Engineer',
        description: 'Worked on the Google Search Engine',
        employeeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        company: 'Facebook',
        position: 'Software Engineer',
        description: 'Worked on the Facebook Social Network',
        employeeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async queryInterface => {
    return await queryInterface.bulkDelete('experiences', null, {});
  },
};
