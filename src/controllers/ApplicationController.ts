import {NextFunction, Request, Response} from 'express';
import userFriendlyMessage from '../consts/userFriendlyMessages';
import ApplicationService from '../services/ApplicationService';
import {
  ApplicationAttributes,
  ApplicationCreationAttributes,
} from '../models/Application';

export default class ApplicationController {
  private applicationService: ApplicationService;
  constructor(applicationService: ApplicationService) {
    this.applicationService = applicationService;
  }
  async getAllApplications(req: Request, res: Response, next: NextFunction) {
    try {
      const applications =
        (await this.applicationService.getAllApplications()) || [];
      res.json({
        message: userFriendlyMessage.success.getAllApplications,
        data: applications,
      });
    } catch (e) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.getAllApplications});
      next(e);
    }
  }

  async getOneApplicationById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const application = await this.applicationService.getOneApplicationById(
        id
      );
      res.json({
        message: userFriendlyMessage.success.getOneApplication,
        data: application,
      });
    } catch (e) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.getOneApplication});
      next(e);
    }
  }

  async createOneApplication(req: Request, res: Response, next: NextFunction) {
    try {
      const toCreate: ApplicationCreationAttributes = {
        ...req.body,
      };
      const createdApplication =
        await this.applicationService.createOneApplication(toCreate);
      res.status(201);
      res.json({
        message: userFriendlyMessage.success.createApplication,
        data: createdApplication,
      });
    } catch (e) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.createApplication});
      next(e);
    }
  }

  async updateOneApplicationById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const applicationId = parseInt(req.params.id);
      const oldApplication =
        await this.applicationService.getOneApplicationById(applicationId);
      const toUpdate: ApplicationAttributes = {
        ...oldApplication,
        ...req.body,
      };

      const application =
        await this.applicationService.updateOneApplicationById(
          applicationId,
          toUpdate
        );
      res.json({
        message: userFriendlyMessage.success.updateApplication,
        data: application,
      });
    } catch (e) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.updateApplication});
      next(e);
    }
  }

  async deleteOneApplicationById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const applicationId = parseInt(req.params.id);
      await this.applicationService.deleteOneApplicationById(applicationId);
      res.json({message: userFriendlyMessage.success.deleteApplication});
    } catch (e) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.deleteApplication});
      next(e);
    }
  }
}
