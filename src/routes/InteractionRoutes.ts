import express, {Request, Response, NextFunction} from 'express';

import InteractionController from '../controllers/InteractionController';
import Container from '../utils/container';
import AuthenticationMiddleware from '../middlewares/authentication';
// import roleValidator, {ADMINS} from '../middlewares/authorization';

export default () => {
  const interactionRouter = express.Router();
  const interactionController: InteractionController =
    Container.getInstance().get('InteractionController');
  const authenticationMiddleware: AuthenticationMiddleware =
    Container.getInstance().get('AuthenticationMiddleware');

  const auth = (req: Request, res: Response, next: NextFunction) =>
    authenticationMiddleware.authentication(req, res, next);

  interactionRouter.get(
    '/',
    [auth],
    interactionController.getAllInteractions.bind(interactionController)
  );

  interactionRouter.get(
    '/employer',
    [auth],
    interactionController.getAllEmployerInteractions.bind(interactionController)
  );

  interactionRouter.get(
    '/employee',
    [auth],
    interactionController.getAllEmployeeInteractions.bind(interactionController)
  );

  interactionRouter.post(
    '/',
    [auth],
    interactionController.createOneInteraction.bind(interactionController)
  );

  interactionRouter.get(
    '/:id',
    [auth],
    interactionController.getOneInteractionById.bind(interactionController)
  );

  interactionRouter.patch(
    '/:id',
    [auth],
    interactionController.updateOneInteractionById.bind(interactionController)
  );

  interactionRouter.delete(
    '/:id',
    [auth],
    interactionController.deleteOneInteractionById.bind(interactionController)
  );

  return interactionRouter;
};
