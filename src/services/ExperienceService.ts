import {
  ExperienceAttributes,
  ExperienceCreationAttributes,
} from '../models/Experience';
import ExperienceRepository from '../repositories/ExperienceRepository';
import Experience from '../models/Experience';

export default class ExperienceService {
  private experienceRepository: ExperienceRepository;

  constructor(experienceRepository: ExperienceRepository) {
    this.experienceRepository = experienceRepository;
  }

  async getAllExperiences() {
    return this.experienceRepository.getAll() as unknown as Experience[];
  }

  async getOneExperienceById(id: number) {
    return (
      await this.experienceRepository.getWithFilters({id})
    )[0] as Experience;
  }

  async createOneExperience(experience: ExperienceCreationAttributes) {
    return (await this.experienceRepository.createOne(
      experience
    )) as Experience;
  }

  async updateOneExperienceById(id: number, attrs: ExperienceAttributes) {
    return this.experienceRepository.updateOne(attrs, {id});
  }

  async deleteOneExperienceById(id: number) {
    return this.experienceRepository.deleteOne({id});
  }
}
