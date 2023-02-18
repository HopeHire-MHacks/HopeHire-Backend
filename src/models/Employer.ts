import {Model, DataTypes, Sequelize, Optional} from 'sequelize';
import User from './User';
import {Models} from '../types';

export interface EmployerAttributes {
  id: number;
  name: string;
  companyDescription: string;
  logo: Buffer;
  address: string;
  userId: number;
  numberOfEmployees: number;
  latLong: number[];
  country: string;
  city: string;
  state: string;
  postalCode: string;
  webAddress: string;
}

export type EmployerCreationAttributes = Optional<
  EmployerAttributes,
  'id' | 'userId'
>;

class Employer extends Model {
  public id!: number;
  public name!: string;
  public companyDescription!: string;
  public logo!: Buffer;
  public address!: string;
  public userId!: number;
  public numberOfEmployees!: number;
  public latLong!: number[];
  public country!: string;
  public city!: string;
  public state!: string;
  public postalCode!: string;
  public webAddress!: string;

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
        country: {
          type: new DataTypes.STRING(128),
          allowNull: false,
        },
        city: {
          type: new DataTypes.STRING(128),
          allowNull: false,
        },
        state: {
          type: new DataTypes.STRING(128),
          allowNull: false,
        },
        postalCode: {
          type: new DataTypes.STRING(128),
          allowNull: false,
        },
        webAddress: {
          type: new DataTypes.STRING(128),
          allowNull: false,
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
    });
    Employer.hasMany(models.Job, {
      foreignKey: 'employerId',
    });
  }
}

export default Employer;
