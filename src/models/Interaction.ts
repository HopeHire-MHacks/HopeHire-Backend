import {Model, DataTypes, Sequelize, Optional} from 'sequelize';
// import {Models} from '../types';

export interface InteractionAttributes {
  id: number;
  interactorId: number;
  interfaceId: number;
  isEmployer: boolean;
}

export type InteractionCreationAttributes = Optional<
  InteractionAttributes,
  'id'
>;

class Interaction extends Model {
  public id!: number;
  public interactorId!: number;
  public interfaceId!: number;
  public isEmployer!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initModel(sequelize: Sequelize) {
    Interaction.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        interactorId: DataTypes.INTEGER,
        interfaceId: DataTypes.INTEGER,
        isEmployer: DataTypes.BOOLEAN,
      },
      {
        sequelize,
        modelName: 'Interaction',
        tableName: 'interactions',
      }
    );
  }

  // public static associate(models: Models) {}
}

export default Interaction;
