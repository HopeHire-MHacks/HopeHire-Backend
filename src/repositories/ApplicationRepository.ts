import {Sequelize} from 'sequelize/types';

import Application from '../models/Application';
import Employer from '../models/Employer';
import Job from '../models/Job';
import {ModelStatic} from '../types';
import BaseRepository, {Filter, TransactionOptions} from './BaseRepository';

export default class ApplicationRepository extends BaseRepository {
  constructor(db: Sequelize) {
    super(db.models[Application.name] as ModelStatic);
  }

  async getEagerLoadedWithFilters(
    filter: Filter,
    options?: TransactionOptions
  ) {
    return await this.getJoinWithFilter(
      filter,
      {
        include: {
          model: Job,
          as: 'job',
          include: {
            model: Employer,
            as: 'employer',
          },
        },
      },
      options
    );
  }
}
