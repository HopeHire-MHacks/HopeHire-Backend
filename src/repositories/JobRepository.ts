import {Sequelize} from 'sequelize/types';
import Employer from '../models/Employer';

import Job from '../models/Job';
import {ModelStatic} from '../types';
import BaseRepository, {Filter, TransactionOptions} from './BaseRepository';

export default class JobRepository extends BaseRepository {
  constructor(db: Sequelize) {
    super(db.models[Job.name] as ModelStatic);
  }

  async getWithFiltersJoinedEmployer(
    filter: Filter,
    options?: TransactionOptions
  ) {
    return await this.getJoinWithFilter(
      filter,
      {include: {model: Employer, as: 'employer'}},
      options
    );
  }
}
