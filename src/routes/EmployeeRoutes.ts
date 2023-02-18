import express, {Request, Response, NextFunction} from 'express';

import EmployeeController from '../controllers/EmployeeController';
import Container from '../utils/container';
import AuthenticationMiddleware from '../middlewares/authentication';
// import roleValidator, {ADMINS} from '../middlewares/authorization';

export default () => {
  const employeeRouter = express.Router();
  const employeeController: EmployeeController =
    Container.getInstance().get('EmployeeController');
  const authenticationMiddleware: AuthenticationMiddleware =
    Container.getInstance().get('AuthenticationMiddleware');

  const auth = (req: Request, res: Response, next: NextFunction) =>
    authenticationMiddleware.authentication(req, res, next);

  employeeRouter.get(
    '/',
    [auth],
    employeeController.getAllEmployees.bind(employeeController)
  );

  employeeRouter.post(
    '/',
    [auth],
    employeeController.createOneEmployee.bind(employeeController)
  );

  employeeRouter.get(
    '/:id',
    [auth],
    employeeController.getOneEmployeeById.bind(employeeController)
  );

  employeeRouter.patch(
    '/:id',
    [auth],
    employeeController.updateOneEmployeeById.bind(employeeController)
  );

  employeeRouter.delete(
    '/:id',
    [auth],
    employeeController.deleteOneEmployeeById.bind(employeeController)
  );

  employeeRouter.get(
    '/:id/applications',
    [auth],
    employeeController.getApplicationsByEmployeeId.bind(employeeController)
  );

  employeeRouter.get(
    '/mass/ids',
    [auth],
    employeeController.getMultipleEmployeeById.bind(employeeController)
  );

  employeeRouter.get(
    '/recommended/employers',
    [auth],
    employeeController.getAllEmployeesRecommended.bind(employeeController)
  );

  return employeeRouter;
};
