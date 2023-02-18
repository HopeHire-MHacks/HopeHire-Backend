import {Model, DataTypes, Sequelize} from 'sequelize';
import User from './User';
import {Models} from '../types';

class Employee extends Model {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public name!: string;
  public userId!: number;

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
    });
  }
}

export default Employee;
