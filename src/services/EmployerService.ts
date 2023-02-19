import {
  EmployerAttributes,
  EmployerCreationAttributes,
} from '../models/Employer';
import EmployerRepository from '../repositories/EmployerRepository';
import Employer from '../models/Employer';

export default class EmployerService {
  private employerRepository: EmployerRepository;

  constructor(employerRepository: EmployerRepository) {
    this.employerRepository = employerRepository;
  }

  async getCount() {
    return this.employerRepository.getCount();
  }

  async getAllEmployers() {
    return this.employerRepository.getAll() as unknown as Employer[];
  }

  async getOneEmployerById(id: number) {
    return (await this.employerRepository.getWithFilters({id}))[0] as Employer;
  }

  async createOneEmployer(employer: EmployerCreationAttributes) {
    return (await this.employerRepository.createOne(employer)) as Employer;
  }

  async updateOneEmployerById(id: number, attrs: EmployerAttributes) {
    return this.employerRepository.updateOne(attrs, {id});
  }

  async deleteOneEmployerById(id: number) {
    return this.employerRepository.deleteOne({id});
  }
}
