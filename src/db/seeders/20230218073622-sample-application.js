'use strict';

module.exports = {
  up: async queryInterface => {
    return await queryInterface.bulkInsert('applications', [
      {
        employeeId: 1,
        jobId: 1,
        remarks: 'I am interested in this job',
        status: 'Pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async queryInterface => {
    return await queryInterface.bulkDelete('applications', null, {});
  },
};
