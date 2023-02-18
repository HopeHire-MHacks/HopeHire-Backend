import {Model, DataTypes, Sequelize, Optional} from 'sequelize';
import {Models} from '../types';

export interface BookmarkAttributes {
  id: number;
  employeeId: number;
  jobId: number;
}

export type BookmarkCreationAttributes = Optional<BookmarkAttributes, 'id'>;

class Bookmark extends Model {
  public id!: number;
  public employeeId!: number;
  public jobId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initModel(sequelize: Sequelize) {
    Bookmark.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        employeeId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'employees',
          },
        },
        jobId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'jobs',
          },
        },
      },
      {
        sequelize,
        modelName: 'Bookmark',
        tableName: 'bookmarks',
      }
    );
  }

  public static associate(models: Models) {
    Bookmark.belongsTo(models.Employee, {
      foreignKey: 'employeeId',
      as: 'employee',
    });
    Bookmark.belongsTo(models.Job, {
      foreignKey: 'jobId',
      as: 'job',
    });
  }
}

export default Bookmark;
