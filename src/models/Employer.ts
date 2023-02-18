import {Model, DataTypes, Sequelize, Optional} from 'sequelize';
import User from './User';
import {Models} from '../types';

export interface EmployerAttributes {
  id: number;
  name: string;
  companyDescription: string;
  logo: Blob;
  address: string;
  userId: number;
  numberOfEmployees: number;
  latLong: number[];
}

export type EmployerCreationAttributes = Optional<EmployerAttributes, 'id'>;

class Employer extends Model {
  public id!: number;
  public name!: string;
  public companyDescription!: string;
  public logo!: Blob;
  public address!: string;
  public userId!: number;
  public numberOfEmployees!: number;
  public latLong!: number[];

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initModel(sequelize: Sequelize) {
    Employer.init(
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
        companyDescription: {
          type: new DataTypes.TEXT(),
          allowNull: false,
        },
        logo: {
          type: new DataTypes.BLOB(),
          allowNull: true,
        },
        address: {
          type: new DataTypes.TEXT(),
          allowNull: false,
        },
        numberOfEmployees: {
          type: DataTypes.INTEGER,
        },
        latLong: {
          type: DataTypes.ARRAY(DataTypes.FLOAT),
        },
      },
      {
        sequelize,
        modelName: 'Employer',
        tableName: 'employers',
      }
    );
  }

  public static associate(models: Models) {
    Employer.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  }
}

export default Employer;
