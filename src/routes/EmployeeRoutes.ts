// import express, {Request, Response, NextFunction} from 'express';
import express from 'express';

import EmployeeController from '../controllers/EmployeeController';
import Container from '../utils/container';
// import AuthenticationMiddleware from '../middlewares/authentication';
// import roleValidator, {ADMINS} from '../middlewares/authorization';

export default () => {
  const employeeRouter = express.Router();
  const employeeController: EmployeeController =
    Container.getInstance().get('EmployeeController');
  //   const authenticationMiddleware: AuthenticationMiddleware =
  //     Container.getInstance().get('AuthenticationMiddleware');

  //   const auth = (req: Request, res: Response, next: NextFunction) =>
  //     authenticationMiddleware.authentication(req, res, next);

  employeeRouter.get(
    '/',
    employeeController.getAllEmployees.bind(employeeController)
  );

  employeeRouter.post(
    '/',
    employeeController.createOneEmployee.bind(employeeController)
  );

  employeeRouter.get(
    '/:id',
    employeeController.getOneEmployeeById.bind(employeeController)
  );

  employeeRouter.patch(
    '/:id',
    employeeController.updateOneEmployeeById.bind(employeeController)
  );

  employeeRouter.delete(
    '/:id',
    employeeController.deleteOneEmployeeById.bind(employeeController)
  );

  employeeRouter.get(
    '/mass/ids',
    employeeController.getMultipleEmployeeById.bind(employeeController)
  );

  return employeeRouter;
};
