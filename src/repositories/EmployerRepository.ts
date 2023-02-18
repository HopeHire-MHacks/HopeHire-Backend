import {Sequelize} from 'sequelize/types';

import Employer from '../models/Employer';
import {ModelStatic} from '../types';
import BaseRepository from './BaseRepository';

export default class EmployerRepository extends BaseRepository {
  constructor(db: Sequelize) {
    super(db.models[Employer.name] as ModelStatic);
  }
}
