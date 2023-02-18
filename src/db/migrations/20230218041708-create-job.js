'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('jobs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      positionName: {
        type: Sequelize.TEXT,
      },
      jobType: {
        type: Sequelize.TEXT,
      },
      industryType: {
        type: Sequelize.INTEGER,
      },
      jobDescription: {
        type: Sequelize.TEXT,
      },
      jobRequirements: {
        type: Sequelize.TEXT,
      },
      jobFlexibility: {
        type: Sequelize.TEXT,
      },
      address: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      hasDialysisSupport: {
        type: Sequelize.BOOLEAN,
      },
      hasFlexibleSchedule: {
        type: Sequelize.BOOLEAN,
      },
      physicalDemands: {
        type: Sequelize.TEXT,
      },
      salaryType: {
        type: Sequelize.TEXT,
      },
      scheduledType: {
        type: Sequelize.TEXT,
      },
      openingTime: {
        type: Sequelize.DATE,
      },
      salaryRange: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      isOpen: {
        type: Sequelize.BOOLEAN,
      },
      skills: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      employerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'employers',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('jobs');
  },
};
