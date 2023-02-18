import {Model, DataTypes, Sequelize} from 'sequelize';
import User from './User';
import {Models} from '../types';

class Employer extends Model {
  public id!: number;
  public name!: string;
  public companyDescription!: string;
  public logo!: Blob;
  public address!: string;
  public userId!: number;

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
