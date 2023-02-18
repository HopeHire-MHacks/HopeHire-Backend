import {
  InteractionAttributes,
  InteractionCreationAttributes,
} from '../models/Interaction';
import InteractionRepository from '../repositories/InteractionRepository';
import Interaction from '../models/Interaction';

export default class InteractionService {
  private interactionRepository: InteractionRepository;

  constructor(interactionRepository: InteractionRepository) {
    this.interactionRepository = interactionRepository;
  }

  async getAllInteractions() {
    return this.interactionRepository.getAll() as unknown as Interaction[];
  }

  async getOneInteractionById(id: number) {
    return (
      await this.interactionRepository.getWithFilters({id})
    )[0] as Interaction;
  }

  async getAllInteractionsByInteractor(isEmployer: boolean) {
    return (await this.interactionRepository.getWithFilters({
      isEmployer,
    })) as Interaction[];
  }

  async createOneInteraction(interaction: InteractionCreationAttributes) {
    return (await this.interactionRepository.createOne(
      interaction
    )) as Interaction;
  }

  async updateOneInteractionById(id: number, attrs: InteractionAttributes) {
    return this.interactionRepository.updateOne(attrs, {id});
  }

  async deleteOneInteractionById(id: number) {
    return this.interactionRepository.deleteOne({id});
  }
}
