// import express, {Request, Response, NextFunction} from 'express';
import express from 'express';

import EmployerController from '../controllers/EmployerController';
import Container from '../utils/container';
// import AuthenticationMiddleware from '../middlewares/authentication';
// import roleValidator, {ADMINS} from '../middlewares/authorization';

export default () => {
  const employerRouter = express.Router();
  const employerController: EmployerController =
    Container.getInstance().get('EmployerController');
  // const authenticationMiddleware: AuthenticationMiddleware =
  //   Container.getInstance().get('AuthenticationMiddleware');

  // const auth = (req: Request, res: Response, next: NextFunction) =>
  //   authenticationMiddleware.authentication(req, res, next);

  employerRouter.get(
    '/',
    employerController.getAllEmployers.bind(employerController)
  );

  employerRouter.put(
    '/',
    employerController.createOneEmployer.bind(employerController)
  );

  // employerRouter.get('/getSelf', employerController.getSelf.bind(employerController));

  // employerRouter.put('/updateSelf', employerController.updateSelf.bind(employerController));

  employerRouter.get(
    '/:id',
    employerController.getOneEmployerById.bind(employerController)
  );

  employerRouter.patch(
    '/:id',
    employerController.updateOneEmployerById.bind(employerController)
  );

  employerRouter.delete(
    '/:id',
    employerController.deleteOneEmployerById.bind(employerController)
  );

  return employerRouter;
};
