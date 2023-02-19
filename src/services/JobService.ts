import {JobAttributes, JobCreationAttributes} from '../models/Job';
import JobRepository from '../repositories/JobRepository';
import Job from '../models/Job';
import {Op} from 'sequelize';

export default class JobService {
  private jobRepository: JobRepository;

  constructor(jobRepository: JobRepository) {
    this.jobRepository = jobRepository;
  }

  async getAllJobs() {
    return this.jobRepository.getWithFiltersJoinedEmployer(
      {}
    ) as unknown as Job[];
  }

  async getAllOpenJobs() {
    return this.jobRepository.getWithFiltersJoinedEmployer({
      isOpen: true,
      openingTime: {
        [Op.lt]: new Date(),
      },
    }) as unknown as Job[];
  }

  async getOneJobById(id: number) {
    return (
      await this.jobRepository.getWithFiltersJoinedEmployer({id})
    )[0] as Job;
  }

  async getJobsByEmployerId(employerId: number) {
    return this.jobRepository.getWithFiltersJoinedEmployer({
      employerId,
    }) as unknown as Job[];
  }

  async createOneJob(job: JobCreationAttributes) {
    return (await this.jobRepository.createOne(job)) as Job;
  }

  async updateOneJobById(id: number, attrs: JobAttributes) {
    return this.jobRepository.updateOne(attrs, {id});
  }

  async deleteOneJobById(id: number) {
    return this.jobRepository.deleteOne({id});
  }

  async getMultipleJobsByIdWithEmployer(ids: number[]) {
    return this.jobRepository.getWithFiltersJoinedEmployer({
      id: ids,
    }) as unknown as Job[];
  }
}
