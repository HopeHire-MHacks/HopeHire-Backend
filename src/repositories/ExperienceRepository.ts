import {Sequelize} from 'sequelize/types';

import Experience from '../models/Experience';
import {ModelStatic} from '../types';
import BaseRepository from './BaseRepository';

export default class ExperienceRepository extends BaseRepository {
  constructor(db: Sequelize) {
    super(db.models[Experience.name] as ModelStatic);
  }
}
