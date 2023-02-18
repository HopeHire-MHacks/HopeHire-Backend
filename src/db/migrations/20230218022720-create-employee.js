'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      personalStatement: {
        type: Sequelize.TEXT,
      },
      skills: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      interests: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      isAvailable: {
        type: Sequelize.BOOLEAN,
      },
      dateOfBirth: {
        type: Sequelize.DATE,
      },
      remarks: {
        type: Sequelize.TEXT,
      },
      availableTimes: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
      },
      preferredLocation: {
        type: Sequelize.ARRAY(Sequelize.DOUBLE),
      },
      dialysisFrequency: {
        type: Sequelize.INTEGER,
      },
      profilePicture: {
        type: Sequelize.BLOB,
      },
      resume: {
        type: Sequelize.BLOB,
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
    await queryInterface.dropTable('employees');
  },
};
