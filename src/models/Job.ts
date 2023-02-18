import {Model, DataTypes, Sequelize, Optional} from 'sequelize';
import {Models} from '../types';
import Employer from './Employer';

export interface JobAttributes {
  id: number;
  positionName: string;
  jobType: string;
  industryType: number;
  jobDescription: string;
  jobRequirements: string;
  jobFlexibility: string;
  latLong: number[];
  hasDialysisSupport: boolean;
  hasFlexibleSchedule: boolean;
  physicalDemands: string;
  salaryType: string;
  scheduledType: string;
  openingTime: Date;
  isOpen: boolean;
  skills: number[];
  employerId: number;
  salaryRange: number[];
  country: string;
  city: string;
  state: string;
  postalCode: string;
  address: string;
}

export type JobCreationAttributes = Optional<
  JobAttributes,
  'id' | 'employerId'
>;

class Job extends Model {
  public id!: number;
  public positionName!: string;
  public jobType!: string;
  public industryType!: number;
  public jobDescription!: string;
  public jobRequirements!: string;
  public jobFlexibility!: string;
  public latLong!: number[];
  public hasDialysisSupport!: boolean;
  public hasFlexibleSchedule!: boolean;
  public physicalDemands!: string;
  public salaryType!: string;
  public scheduledType!: string;
  public openingTime!: Date;
  public employerId!: number;
  public isOpen!: boolean;
  public salaryRange!: number[];
  public skills!: number[];
  public country!: string;
  public city!: string;
  public state!: string;
  public postalCode!: string;
  public address!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initModel(sequelize: Sequelize) {
    Job.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        positionName: DataTypes.TEXT,
        jobType: DataTypes.TEXT,
        industryType: DataTypes.INTEGER,
        jobDescription: DataTypes.TEXT,
        jobRequirements: DataTypes.TEXT,
        jobFlexibility: DataTypes.TEXT,
        latLong: DataTypes.ARRAY(DataTypes.FLOAT),
        hasDialysisSupport: DataTypes.BOOLEAN,
        hasFlexibleSchedule: DataTypes.BOOLEAN,
        physicalDemands: DataTypes.TEXT,
        salaryType: DataTypes.TEXT,
        scheduledType: DataTypes.TEXT,
        openingTime: DataTypes.DATE,
        isOpen: DataTypes.BOOLEAN,
        skills: DataTypes.ARRAY(DataTypes.INTEGER),
        salaryRange: DataTypes.ARRAY(DataTypes.INTEGER),
        country: DataTypes.TEXT,
        city: DataTypes.TEXT,
        state: DataTypes.TEXT,
        postalCode: DataTypes.TEXT,
        address: DataTypes.TEXT,
        employerId: {
          type: DataTypes.INTEGER,
          references: {
            model: Employer,
            key: 'id',
          },
        },
      },
      {
        sequelize,
        modelName: 'Job',
        tableName: 'jobs',
      }
    );
  }

  public static associate(models: Models) {
    Job.belongsTo(models.Employer, {
      foreignKey: 'employerId',
      as: 'employer',
    });
  }
}

export default Job;
