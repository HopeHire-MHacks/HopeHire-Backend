import {Model, DataTypes, Sequelize, Optional} from 'sequelize';
import {Models} from '../types';

export interface ExperienceAttributes {
  id: number;
  company: string;
  position: string;
  description: string;
  employeeId: number;
}

export type ExperienceCreationAttributes = Optional<ExperienceAttributes, 'id'>;

class Experience extends Model {
  public id!: number;
  public company!: string;
  public position!: string;
  public description!: string;
  public employeeId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initModel(sequelize: Sequelize) {
    Experience.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        company: DataTypes.TEXT,
        position: DataTypes.TEXT,
        description: DataTypes.TEXT,
        employeeId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'employees',
            key: 'id',
          },
        },
      },
      {
        sequelize,
        modelName: 'Experience',
        tableName: 'experiences',
      }
    );
  }

  public static associate(models: Models) {
    Experience.belongsTo(models.Employee, {
      foreignKey: 'employeeId',
    });
  }
}

export default Experience;
