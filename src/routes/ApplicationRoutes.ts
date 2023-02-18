import express, {Request, Response, NextFunction} from 'express';

import ApplicationController from '../controllers/ApplicationController';
import Container from '../utils/container';
import AuthenticationMiddleware from '../middlewares/authentication';
// import roleValidator, {ADMINS} from '../middlewares/authorization';

export default () => {
  const applicationRouter = express.Router();
  const applicationController: ApplicationController =
    Container.getInstance().get('ApplicationController');
  const authenticationMiddleware: AuthenticationMiddleware =
    Container.getInstance().get('AuthenticationMiddleware');

  const auth = (req: Request, res: Response, next: NextFunction) =>
    authenticationMiddleware.authentication(req, res, next);

  applicationRouter.get(
    '/',
    [auth],
    applicationController.getAllApplications.bind(applicationController)
  );

  applicationRouter.post(
    '/',
    [auth],
    applicationController.createOneApplication.bind(applicationController)
  );

  applicationRouter.get(
    '/:id',
    [auth],
    applicationController.getOneApplicationById.bind(applicationController)
  );

  applicationRouter.patch(
    '/:id',
    [auth],
    applicationController.updateOneApplicationById.bind(applicationController)
  );

  applicationRouter.delete(
    '/:id',
    [auth],
    applicationController.deleteOneApplicationById.bind(applicationController)
  );

  return applicationRouter;
};
