'use strict';

module.exports = {
  up: async queryInterface => {
    return await queryInterface.bulkInsert('jobs', [
      {
        positionName: 'Software Engineer',
        jobType: 'Full Time',
        industryType: 2,
        jobDescription:
          'We are looking for a software engineer to join our team. You will be responsible for developing and maintaining our software products.',
        jobRequirements:
          'You should have at least 5 years of experience in software development. You should have experience in developing web applications using React and Node.js.',
        jobFlexibility: 'Remote',
        address: [1, 2],
        hasDialysisSupport: true,
        hasFlexibleSchedule: true,
        physicalDemands: 'Light',
        salaryType: 'Fixed  ',
        scheduledType: 'Part Time',
        openingTime: new Date('2021-01-01'),
        salaryRange: [5000, 10000],
        employerId: 1,
        skills: [1, 2, 3],
        isOpen: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        positionName: 'Data Analyst',
        jobType: 'Full Time',
        industryType: 4,
        jobDescription:
          'We are looking for a data analyst to join our team. You will be responsible for analyzing and interpreting large data sets to support business decisions.',
        jobRequirements:
          'You should have at least 3 years of experience in data analysis. You should be proficient in SQL and have experience with data visualization tools such as Tableau or PowerBI.',
        jobFlexibility: 'Flexible Schedule',
        address: [1.2932, 103.8558],
        hasDialysisSupport: true,
        hasFlexibleSchedule: false,
        physicalDemands: 'Low',
        salaryType: 'Salary + Bonus',
        scheduledType: 'Full Time',
        openingTime: new Date('2022-06-01'),
        salaryRange: [7000, 15000],
        employerId: 3,
        skills: [1, 5, 3],
        isOpen: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        positionName: 'DevOps Engineer',
        jobType: 'Contract',
        industryType: 5,
        jobDescription:
          'We are looking for a DevOps engineer to join our team. You will be responsible for automating and improving the software deployment process.',
        jobRequirements:
          'You should have at least 5 years of experience in DevOps. You should be proficient in scripting languages such as Python or Ruby and have experience with cloud infrastructure such as AWS or Google Cloud.',
        jobFlexibility: 'Remote',
        address: [1.3521, 103.8198],
        hasDialysisSupport: false,
        hasFlexibleSchedule: false,
        physicalDemands: 'Low',
        salaryType: 'Hourly',
        scheduledType: 'Part Time',
        openingTime: new Date('2022-10-01'),
        salaryRange: [50, 80],
        employerId: 2,
        skills: [8, 3],
        isOpen: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        positionName: 'Product Manager',
        jobType: 'Full Time',
        industryType: 8,
        jobDescription:
          'We are looking for a product manager to join our team. You will be responsible for defining and delivering our product roadmap.',
        jobRequirements:
          'You should have at least 5 years of experience in product management. You should have experience in Agile methodologies and have a proven track record of delivering successful products.',
        jobFlexibility: 'Flexible Schedule',
        address: [1.2932, 103.8558],
        hasDialysisSupport: true,
        hasFlexibleSchedule: true,
        physicalDemands: 'Low',
        salaryType: 'Fixed ',
        scheduledType: 'Full Time',
        openingTime: new Date('2022-05-01'),
        salaryRange: [9000, 15000],
        employerId: 3,
        skills: [1, 2, 8],
        isOpen: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async queryInterface => {
    return await queryInterface.bulkDelete('jobs', null, {});
  },
};