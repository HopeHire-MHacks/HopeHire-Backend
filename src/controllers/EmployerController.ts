import {NextFunction, Request, Response} from 'express';
import userFriendlyMessage from '../consts/userFriendlyMessages';
import EmployerService from '../services/EmployerService';
import {
  EmployerAttributes,
  EmployerCreationAttributes,
} from '../models/Employer';
import UserService from '../services/UserService';
import {MultipleRoleCreationError} from '../models/User';
import JobService from '../services/JobService';

export default class EmployerController {
  private employerService: EmployerService;
  private jobService: JobService;
  private userService: UserService;

  constructor(
    employerService: EmployerService,
    jobService: JobService,
    userService: UserService
  ) {
    this.employerService = employerService;
    this.jobService = jobService;
    this.userService = userService;
  }
  async getAllEmployers(req: Request, res: Response, next: NextFunction) {
    try {
      const employers = (await this.employerService.getAllEmployers()) || [];
      res.json({
        message: userFriendlyMessage.success.getAllEmployers,
        data: employers,
      });
    } catch (e) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.getAllEmployers});
      next(e);
    }
  }

  async getOneEmployerById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const employer = await this.employerService.getOneEmployerById(id);
      res.json({
        message: userFriendlyMessage.success.getOneEmployer,
        data: employer,
      });
    } catch (e) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.getOneEmployer});
      next(e);
    }
  }

  async createOneEmployer(req: Request, res: Response, next: NextFunction) {
    try {
      const toCreate: EmployerCreationAttributes = {
        userId: req.user.id,
        ...req.body,
      };

      const user = await this.userService.getActableById(req.user.id);
      if (user.employee || user.employer) {
        throw new MultipleRoleCreationError();
      }

      const createdEmployer = await this.employerService.createOneEmployer(
        toCreate
      );
      res.status(201);
      res.json({
        message: userFriendlyMessage.success.createEmployer,
        data: createdEmployer,
      });
    } catch (e) {
      res.status(400);
      if (e instanceof MultipleRoleCreationError) {
        res.json({message: e.message});
        return;
      }
      res.json({message: userFriendlyMessage.failure.createEmployer});
      next(e);
    }
  }

  async updateOneEmployerById(req: Request, res: Response, next: NextFunction) {
    try {
      const employerId = parseInt(req.params.id);
      const oldEmployer = await this.employerService.getOneEmployerById(
        employerId
      );
      const toUpdate: EmployerAttributes = {
        ...oldEmployer,
        ...req.body,
      };

      const employer = await this.employerService.updateOneEmployerById(
        employerId,
        toUpdate
      );
      res.json({
        message: userFriendlyMessage.success.updateEmployer,
        data: employer,
      });
    } catch (e) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.updateEmployer});
      next(e);
    }
  }

  async deleteOneEmployerById(req: Request, res: Response, next: NextFunction) {
    try {
      const employerId = parseInt(req.params.id);
      await this.employerService.deleteOneEmployerById(employerId);
      res.json({message: userFriendlyMessage.success.deleteEmployer});
    } catch (e) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.deleteEmployer});
      next(e);
    }
  }
}
