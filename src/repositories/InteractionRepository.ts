import {Sequelize} from 'sequelize/types';

import Interaction from '../models/Interaction';
import {ModelStatic} from '../types';
import BaseRepository from './BaseRepository';

export default class InteractionRepository extends BaseRepository {
  constructor(db: Sequelize) {
    super(db.models[Interaction.name] as ModelStatic);
  }
}
