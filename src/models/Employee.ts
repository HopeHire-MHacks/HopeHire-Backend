import {Model, DataTypes, Sequelize, Optional} from 'sequelize';
import User from './User';
import {Models} from '../types';

export interface EmployeeAttributes {
  id: number;
  name: string;
  userId: number;
  personalStatement: string;
  skills: number[];
  interests: number[];
  isAvailable: boolean;
  dateOfBirth: Date;
  remarks: string;
  availableTimes: number[];
  preferredLocation: number[];
  dialysisFrequency: number;
  profilePicture: Blob;
  resume: Blob;
}

export type EmployeeCreationAttributes = Optional<EmployeeAttributes, 'id'>;

class Employee extends Model {
  public id!: number;
  public name!: string;
  public userId!: number;
  public personalStatement!: string;
  public skills!: number[];
  public interests!: number[];
  public isAvailable!: boolean;
  public dateOfBirth!: Date;
  public remarks!: string;
  public availableTimes!: number[];
  public preferredLocation!: number[];
  public dialysisFrequency!: number;
  public profilePicture!: Blob;
  public resume!: Blob;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initModel(sequelize: Sequelize) {
    Employee.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: new DataTypes.STRING(128),
          allowNull: false,
        },
        userId: {
          type: DataTypes.INTEGER,
          references: {
            model: User,
            key: 'id',
          },
        },
        personalStatement: DataTypes.TEXT,
        skills: {
          type: DataTypes.ARRAY(DataTypes.INTEGER),
        },
        interests: DataTypes.ARRAY(DataTypes.INTEGER),
        isAvailable: DataTypes.BOOLEAN,
        dateOfBirth: DataTypes.DATE,
        remarks: DataTypes.TEXT,
        availableTimes: DataTypes.ARRAY(DataTypes.INTEGER),
        preferredLocation: DataTypes.ARRAY(DataTypes.INTEGER),
        dialysisFrequency: DataTypes.INTEGER,
        profilePicture: DataTypes.BLOB,
        resume: DataTypes.BLOB,
      },
      {
        sequelize,
        modelName: 'Employee',
        tableName: 'employees',
      }
    );
  }

  public static associate(models: Models) {
    Employee.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  }
}

export default Employee;
