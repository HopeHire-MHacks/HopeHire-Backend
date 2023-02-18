import {Sequelize} from 'sequelize/types';

import Application from '../models/Application';
import {ModelStatic} from '../types';
import BaseRepository from './BaseRepository';

export default class ApplicationRepository extends BaseRepository {
  constructor(db: Sequelize) {
    super(db.models[Application.name] as ModelStatic);
  }
}
