import {
  ApplicationAttributes,
  ApplicationCreationAttributes,
} from '../models/Application';
import ApplicationRepository from '../repositories/ApplicationRepository';
import Application from '../models/Application';

export default class ApplicationService {
  private applicationRepository: ApplicationRepository;

  constructor(applicationRepository: ApplicationRepository) {
    this.applicationRepository = applicationRepository;
  }

  async getAllApplications() {
    return this.applicationRepository.getEagerLoadedWithFilters(
      {}
    ) as unknown as Application[];
  }

  async getOneApplicationById(id: number) {
    return (
      await this.applicationRepository.getWithFilters({id})
    )[0] as Application;
  }

  async createOneApplication(application: ApplicationCreationAttributes) {
    return (await this.applicationRepository.createOne(
      application
    )) as Application;
  }

  async getApplicationsByEmployeeId(employeeId: number) {
    return (await this.applicationRepository.getEagerLoadedWithFilters({
      employeeId,
    })) as Application[];
  }

  async getApplicationsByJobId(jobId: number) {
    return (await this.applicationRepository.getEagerLoadedWithFilters({
      jobId,
    })) as Application[];
  }

  async updateOneApplicationById(id: number, attrs: ApplicationAttributes) {
    return this.applicationRepository.updateOne(attrs, {id});
  }

  async deleteOneApplicationById(id: number) {
    return this.applicationRepository.deleteOne({id});
  }
}
