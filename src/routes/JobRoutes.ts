// import express, {Request, Response, NextFunction} from 'express';
import express from 'express';

import JobController from '../controllers/JobController';
import Container from '../utils/container';
// import AuthenticationMiddleware from '../middlewares/authentication';
// import roleValidator, {ADMINS} from '../middlewares/authorization';

export default () => {
  const jobRouter = express.Router();
  const jobController: JobController =
    Container.getInstance().get('JobController');
  //   const authenticationMiddleware: AuthenticationMiddleware =
  //     Container.getInstance().get('AuthenticationMiddleware');

  //   const auth = (req: Request, res: Response, next: NextFunction) =>
  //     authenticationMiddleware.authentication(req, res, next);

  jobRouter.get('/', jobController.getAllJobs.bind(jobController));

  jobRouter.post('/', jobController.createOneJob.bind(jobController));

  jobRouter.get(
    '/:id',

    jobController.getOneJobById.bind(jobController)
  );

  jobRouter.patch(
    '/:id',

    jobController.updateOneJobById.bind(jobController)
  );

  jobRouter.delete(
    '/:id',

    jobController.deleteOneJobById.bind(jobController)
  );

  jobRouter.get(
    '/mass/ids',
    jobController.getMultipleJobById.bind(jobController)
  );

  return jobRouter;
};
