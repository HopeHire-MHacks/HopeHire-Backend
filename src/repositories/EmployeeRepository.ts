import {Sequelize} from 'sequelize/types';

import Employee from '../models/Employee';
import {ModelStatic} from '../types';
import BaseRepository from './BaseRepository';

export default class EmployeeRepository extends BaseRepository {
  constructor(db: Sequelize) {
    super(db.models[Employee.name] as ModelStatic);
  }
}
