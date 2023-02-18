import {NextFunction, Request, Response} from 'express';
import userFriendlyMessage from '../consts/userFriendlyMessages';
import EmployeeService from '../services/EmployeeService';
import {
  EmployeeAttributes,
  EmployeeCreationAttributes,
} from '../models/Employee';

export default class EmployeeController {
  private employeeService: EmployeeService;
  constructor(employeeService: EmployeeService) {
    this.employeeService = employeeService;
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
}
