import express, {Request, Response, NextFunction} from 'express';

import JobController from '../controllers/JobController';
import Container from '../utils/container';
import AuthenticationMiddleware from '../middlewares/authentication';
// import roleValidator, {ADMINS} from '../middlewares/authorization';

export default () => {
  const jobRouter = express.Router();
  const jobController: JobController =
    Container.getInstance().get('JobController');
  const authenticationMiddleware: AuthenticationMiddleware =
    Container.getInstance().get('AuthenticationMiddleware');

  const auth = (req: Request, res: Response, next: NextFunction) =>
    authenticationMiddleware.authentication(req, res, next);

  jobRouter.get('/', [auth], jobController.getAllJobs.bind(jobController));

  jobRouter.post('/', [auth], jobController.createOneJob.bind(jobController));

  jobRouter.get(
    '/open',
    [auth],
    jobController.getAllOpenJobs.bind(jobController)
  );

  jobRouter.get(
    '/:id/applications',
    [auth],
    jobController.getApplicationsByJobId.bind(jobController)
  );

  jobRouter.get(
    '/:id',
    [auth],
    jobController.getOneJobById.bind(jobController)
  );

  jobRouter.patch(
    '/:id',
    [auth],
    jobController.updateOneJobById.bind(jobController)
  );

  jobRouter.delete(
    '/:id',
    [auth],
    jobController.deleteOneJobById.bind(jobController)
  );

  jobRouter.get(
    '/mass/ids',
    [auth],
    jobController.getMultipleJobById.bind(jobController)
  );

  jobRouter.get(
    '/recommended/employees',
    [auth],
    jobController.getAllJobsRecommended.bind(jobController)
  );

  jobRouter.get(
    '/count/total',
    [auth],
    jobController.getCount.bind(jobController)
  );

  return jobRouter;
};
