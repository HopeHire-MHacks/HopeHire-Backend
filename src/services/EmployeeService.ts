import {
  EmployeeAttributes,
  EmployeeCreationAttributes,
} from '../models/Employee';
import EmployeeRepository from '../repositories/EmployeeRepository';
import Employee from '../models/Employee';

export default class EmployeeService {
  private employeeRepository: EmployeeRepository;

  constructor(employeeRepository: EmployeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  async getCount() {
    return this.employeeRepository.getCount();
  }

  async getAllEmployees() {
    return this.employeeRepository.getAll() as unknown as Employee[];
  }

  async getOneEmployeeById(id: number) {
    return (await this.employeeRepository.getWithFilters({id}))[0] as Employee;
  }

  async getMultipleEmployeeById(ids: number[]) {
    return this.employeeRepository.getWithFilters({
      id: ids,
    }) as unknown as Employee[];
  }

  async createOneEmployee(employee: EmployeeCreationAttributes) {
    return (await this.employeeRepository.createOne(employee)) as Employee;
  }

  async updateOneEmployeeById(id: number, attrs: EmployeeAttributes) {
    return this.employeeRepository.updateOne(attrs, {id});
  }

  async deleteOneEmployeeById(id: number) {
    return this.employeeRepository.deleteOne({id});
  }
}
