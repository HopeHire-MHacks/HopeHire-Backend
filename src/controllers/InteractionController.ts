import {NextFunction, Request, Response} from 'express';
import userFriendlyMessage from '../consts/userFriendlyMessages';
import InteractionService from '../services/InteractionService';
import {
  InteractionAttributes,
  InteractionCreationAttributes,
} from '../models/Interaction';

export default class InteractionController {
  private interactionService: InteractionService;
  constructor(interactionService: InteractionService) {
    this.interactionService = interactionService;
  }
  async getAllInteractions(req: Request, res: Response, next: NextFunction) {
    try {
      const interactions =
        (await this.interactionService.getAllInteractions()) || [];
      res.json({
        message: userFriendlyMessage.success.getAllInteractions,
        data: interactions,
      });
    } catch (e) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.getAllInteractions});
      next(e);
    }
  }

  async getAllEmployeeInteractions(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const interactions =
        (await this.interactionService.getAllInteractionsByInteractor(false)) ||
        [];
      res.json({
        message: userFriendlyMessage.success.getAllInteractions,
        data: interactions,
      });
    } catch (e) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.getAllInteractions});
      next(e);
    }
  }

  async getAllEmployerInteractions(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const interactions =
        (await this.interactionService.getAllInteractionsByInteractor(true)) ||
        [];
      res.json({
        message: userFriendlyMessage.success.getAllInteractions,
        data: interactions,
      });
    } catch (e) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.getAllInteractions});
      next(e);
    }
  }

  async getOneInteractionById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const interaction = await this.interactionService.getOneInteractionById(
        id
      );
      res.json({
        message: userFriendlyMessage.success.getOneInteraction,
        data: interaction,
      });
    } catch (e) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.getOneInteraction});
      next(e);
    }
  }

  async createOneInteraction(req: Request, res: Response, next: NextFunction) {
    try {
      const toCreate: InteractionCreationAttributes = {
        ...req.body,
      };
      const createdInteraction =
        await this.interactionService.createOneInteraction(toCreate);
      res.status(201);
      res.json({
        message: userFriendlyMessage.success.createInteraction,
        data: createdInteraction,
      });
    } catch (e) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.createInteraction});
      next(e);
    }
  }

  async updateOneInteractionById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const interactionId = parseInt(req.params.id);
      const oldInteraction =
        await this.interactionService.getOneInteractionById(interactionId);
      const toUpdate: InteractionAttributes = {
        ...oldInteraction,
        ...req.body,
      };

      const interaction =
        await this.interactionService.updateOneInteractionById(
          interactionId,
          toUpdate
        );
      res.json({
        message: userFriendlyMessage.success.updateInteraction,
        data: interaction,
      });
    } catch (e) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.updateInteraction});
      next(e);
    }
  }

  async deleteOneInteractionById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const interactionId = parseInt(req.params.id);
      await this.interactionService.deleteOneInteractionById(interactionId);
      res.json({message: userFriendlyMessage.success.deleteInteraction});
    } catch (e) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.deleteInteraction});
      next(e);
    }
  }
}
