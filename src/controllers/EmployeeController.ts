import {NextFunction, Request, Response} from 'express';
import userFriendlyMessage from '../consts/userFriendlyMessages';
import EmployeeService from '../services/EmployeeService';
import {
  EmployeeAttributes,
  EmployeeCreationAttributes,
} from '../models/Employee';
import enviroment from '../consts/enviroment';
import axios from 'axios';
import ApplicationService from '../services/ApplicationService';
import UserService from '../services/UserService';
import {MultipleRoleCreationError} from '../models/User';

export default class EmployeeController {
  private employeeService: EmployeeService;
  private applicationService: ApplicationService;
  private userService: UserService;

  constructor(
    employeeService: EmployeeService,
    applicationService: ApplicationService,
    userService: UserService
  ) {
    this.employeeService = employeeService;
    this.applicationService = applicationService;
    this.userService = userService;
  }
  async getAllEmployees(req: Request, res: Response, next: NextFunction) {
    try {
      const employees = (await this.employeeService.getAllEmployees()) || [];
      res.json({
        message: userFriendlyMessage.success.getAllEmployees,
        data: employees,
      });
    } catch (e) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.getAllEmployees});
      next(e);
    }
  }

  async getOneEmployeeById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const employee = await this.employeeService.getOneEmployeeById(id);
      res.json({
        message: userFriendlyMessage.success.getOneEmployee,
        data: employee,
      });
    } catch (e) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.getOneEmployee});
      next(e);
    }
  }

  async getAllEmployeesRecommended(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await axios.get(
        enviroment.recommendationAPI + '/employers/' + req.params.id
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const employee_ids: any = response.data['patient_ids'];

      const employees =
        this.employeeService.getMultipleEmployeeById(employee_ids);
      employees.then(data => {
        res.json({
          message: userFriendlyMessage.success.getAllJobs,
          data: data,
        });
      });
    } catch (e) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.getAllJobs});
      next(e);
    }
  }

  async getAllJobsRecommended(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await axios.get(
        enviroment.recommendationAPI + '/jobs/' + req.params.id
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const employee_ids: any = response.data['patient_ids'];

      const employees =
        this.employeeService.getMultipleEmployeeById(employee_ids);
      employees.then(data => {
        res.json({
          message: userFriendlyMessage.success.getAllJobs,
          data: data,
        });
      });
    } catch (e) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.getAllJobs});
      next(e);
    }
  }

  async getMultipleEmployeeById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const employees = await this.employeeService.getMultipleEmployeeById(
        req.body.ids
      );

      res.json({
        message: userFriendlyMessage.success.getMultipleEmployees,
        data: employees,
      });
    } catch (e) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.getMultipleEmployees});
      next(e);
    }
  }

  async createOneEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const toCreate: EmployeeCreationAttributes = {
        userId: req.user.id,
        ...req.body,
      };

      const user = await this.userService.getActableById(req.user.id);
      if (user.employee || user.employer) {
        throw new MultipleRoleCreationError();
      }

      const createdEmployee = await this.employeeService.createOneEmployee(
        toCreate
      );
      res.status(201);
      res.json({
        message: userFriendlyMessage.success.createEmployee,
        data: createdEmployee,
      });
    } catch (e) {
      res.status(400);
      if (e instanceof MultipleRoleCreationError) {
        res.json({message: e.message});
        return;
      }
      res.json({message: userFriendlyMessage.failure.createEmployee});
      next(e);
    }
  }

  async updateOneEmployeeById(req: Request, res: Response, next: NextFunction) {
    try {
      const employeeId = parseInt(req.params.id);
      const oldEmployee = await this.employeeService.getOneEmployeeById(
        employeeId
      );
      const toUpdate: EmployeeAttributes = {
        ...oldEmployee,
        ...req.body,
      };

      const employee = await this.employeeService.updateOneEmployeeById(
        employeeId,
        toUpdate
      );
      res.json({
        message: userFriendlyMessage.success.updateEmployee,
        data: employee,
      });
    } catch (e) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.updateEmployee});
      next(e);
    }
  }

  async getApplicationsByEmployeeId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const employeeId = parseInt(req.params.id);
      const applications =
        await this.applicationService.getApplicationsByEmployeeId(employeeId);
      res.json({
        message: userFriendlyMessage.success.getApplicationsByEmployeeId,
        data: applications,
      });
    } catch (e) {
      res.status(400);
      res.json({
        message: userFriendlyMessage.failure.getApplicationsByEmployeeId,
      });
      next(e);
    }
  }

  async deleteOneEmployeeById(req: Request, res: Response, next: NextFunction) {
    try {
      const employeeId = parseInt(req.params.id);
      await this.employeeService.deleteOneEmployeeById(employeeId);
      res.json({message: userFriendlyMessage.success.deleteEmployee});
    } catch (e) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.deleteEmployee});
      next(e);
    }
  }

  async getCount(req: Request, res: Response, next: NextFunction) {
    try {
      const count = await this.employeeService.getCount();
      res.json({count: count});
    } catch (e) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.getAllEmployees});
      next(e);
    }
  }
}
