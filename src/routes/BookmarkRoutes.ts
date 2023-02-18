import express, {Request, Response, NextFunction} from 'express';

import BookmarkController from '../controllers/BookmarkController';
import Container from '../utils/container';
import AuthenticationMiddleware from '../middlewares/authentication';
// import roleValidator, {ADMINS} from '../middlewares/authorization';

export default () => {
  const bookmarkRouter = express.Router();
  const bookmarkController: BookmarkController =
    Container.getInstance().get('BookmarkController');
  const authenticationMiddleware: AuthenticationMiddleware =
    Container.getInstance().get('AuthenticationMiddleware');

  const auth = (req: Request, res: Response, next: NextFunction) =>
    authenticationMiddleware.authentication(req, res, next);

  bookmarkRouter.get(
    '/',
    [auth],
    bookmarkController.getAllBookmarks.bind(bookmarkController)
  );

  bookmarkRouter.post(
    '/',
    [auth],
    bookmarkController.createOneBookmark.bind(bookmarkController)
  );

  bookmarkRouter.get(
    '/:id',
    [auth],
    bookmarkController.getOneBookmarkById.bind(bookmarkController)
  );

  bookmarkRouter.patch(
    '/:id',
    [auth],
    bookmarkController.updateOneBookmarkById.bind(bookmarkController)
  );

  bookmarkRouter.delete(
    '/:id',
    [auth],
    bookmarkController.deleteOneBookmarkById.bind(bookmarkController)
  );

  return bookmarkRouter;
};
