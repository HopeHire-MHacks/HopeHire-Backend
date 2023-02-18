import {Model, DataTypes, Sequelize, Optional} from 'sequelize';
import {Models} from '../types';

export interface ApplicationAttributes {
  id: number;
  employeeId: number;
  jobId: number;
  remarks: string;
  status: string;
}

export type ApplicationCreationAttributes = Optional<
  ApplicationAttributes,
  'id' | 'employeeId'
>;

class Application extends Model {
  public id!: number;
  public employeeId!: number;
  public jobId!: number;
  public remarks!: string;
  public status!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initModel(sequelize: Sequelize) {
    Application.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        employeeId: DataTypes.INTEGER,
        jobId: DataTypes.INTEGER,
        remarks: DataTypes.TEXT,
        status: DataTypes.TEXT,
      },
      {
        sequelize,
        modelName: 'Application',
        tableName: 'applications',
      }
    );
  }

  public static associate(models: Models) {
    Application.belongsTo(models.Employee, {
      foreignKey: 'employeeId',
      as: 'employee',
    });
    Application.belongsTo(models.Job, {
      foreignKey: 'jobId',
      as: 'job',
    });
  }
}

export default Application;
