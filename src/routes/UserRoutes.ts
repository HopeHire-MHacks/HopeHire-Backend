import express, {Request, Response, NextFunction} from 'express';

import UserController from '../controllers/UserController';
import Container from '../utils/container';
import AuthenticationMiddleware from '../middlewares/authentication';
// import roleValidator, {ADMINS} from '../middlewares/authorization';

export default () => {
  const userRouter = express.Router();
  const userController: UserController =
    Container.getInstance().get('UserController');
  const authenticationMiddleware: AuthenticationMiddleware =
    Container.getInstance().get('AuthenticationMiddleware');

  const auth = (req: Request, res: Response, next: NextFunction) =>
    authenticationMiddleware.authentication(req, res, next);

  userRouter.get('/', [auth], userController.getAllUsers.bind(userController));

  userRouter.get(
    '/getSelf',
    [auth],
    userController.getSelf.bind(userController)
  );

  // userRouter.post('/updateSelf', userController.updateSelf.bind(userController));

  // userRouter.get('/:id', userController.getOneUserById.bind(userController));

  // userRouter.post('/:id', userController.updateOneUserById.bind(userController));

  // userRouter.delete(
  //   '/:id',
  //   userController.deleteOneUserById.bind(userController)
  // );

  // userRouter.delete(
  //   '/',
  //   userController.bulkDeleteUserById.bind(userController)
  // );
  return userRouter;
};
