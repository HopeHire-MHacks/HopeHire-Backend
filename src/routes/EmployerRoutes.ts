import express, {Request, Response, NextFunction} from 'express';

import EmployerController from '../controllers/EmployerController';
import Container from '../utils/container';
import AuthenticationMiddleware from '../middlewares/authentication';
// import roleValidator, {ADMINS} from '../middlewares/authorization';

export default () => {
  const employerRouter = express.Router();
  const employerController: EmployerController =
    Container.getInstance().get('EmployerController');
  const authenticationMiddleware: AuthenticationMiddleware =
    Container.getInstance().get('AuthenticationMiddleware');

  const auth = (req: Request, res: Response, next: NextFunction) =>
    authenticationMiddleware.authentication(req, res, next);

  employerRouter.get(
    '/',
    [auth],
    employerController.getAllEmployers.bind(employerController)
  );

  employerRouter.post(
    '/',
    [auth],
    employerController.createOneEmployer.bind(employerController)
  );

  employerRouter.get(
    '/:id',
    [auth],
    employerController.getOneEmployerById.bind(employerController)
  );

  employerRouter.patch(
    '/:id',
    [auth],
    employerController.updateOneEmployerById.bind(employerController)
  );

  employerRouter.delete(
    '/:id',
    [auth],
    employerController.deleteOneEmployerById.bind(employerController)
  );
  
  employerRouter.get(
    '/:id/jobs',
    [auth],
    employerController.getJobsByEmployerId.bind(employerController)
  );

  return employerRouter;
};
