import {NextFunction, Request, Response} from 'express';
import userFriendlyMessage from '../consts/userFriendlyMessages';
import BookmarkService from '../services/BookmarkService';
import {
  BookmarkAttributes,
  BookmarkCreationAttributes,
} from '../models/Bookmark';

export default class BookmarkController {
  private bookmarkService: BookmarkService;
  constructor(bookmarkService: BookmarkService) {
    this.bookmarkService = bookmarkService;
  }
  async getAllBookmarks(req: Request, res: Response, next: NextFunction) {
    try {
      const bookmarks = (await this.bookmarkService.getAllBookmarks()) || [];
      res.json({
        message: userFriendlyMessage.success.getAllBookmarks,
        data: bookmarks,
      });
    } catch (e) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.getAllBookmarks});
      next(e);
    }
  }

  async getOneBookmarkById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const bookmark = await this.bookmarkService.getOneBookmarkById(id);
      res.json({
        message: userFriendlyMessage.success.getOneBookmark,
        data: bookmark,
      });
    } catch (e) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.getOneBookmark});
      next(e);
    }
  }

  async createOneBookmark(req: Request, res: Response, next: NextFunction) {
    try {
      const toCreate: BookmarkCreationAttributes = {
        ...req.body,
      };
      const createdBookmark = await this.bookmarkService.createOneBookmark(
        toCreate
      );
      res.status(201);
      res.json({
        message: userFriendlyMessage.success.createBookmark,
        data: createdBookmark,
      });
    } catch (e) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.createBookmark});
      next(e);
    }
  }

  async updateOneBookmarkById(req: Request, res: Response, next: NextFunction) {
    try {
      const bookmarkId = parseInt(req.params.id);
      const oldBookmark = await this.bookmarkService.getOneBookmarkById(
        bookmarkId
      );
      const toUpdate: BookmarkAttributes = {
        ...oldBookmark,
        ...req.body,
      };

      const bookmark = await this.bookmarkService.updateOneBookmarkById(
        bookmarkId,
        toUpdate
      );
      res.json({
        message: userFriendlyMessage.success.updateBookmark,
        data: bookmark,
      });
    } catch (e) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.updateBookmark});
      next(e);
    }
  }

  async deleteOneBookmarkById(req: Request, res: Response, next: NextFunction) {
    try {
      const bookmarkId = parseInt(req.params.id);
      await this.bookmarkService.deleteOneBookmarkById(bookmarkId);
      res.json({message: userFriendlyMessage.success.deleteBookmark});
    } catch (e) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.deleteBookmark});
      next(e);
    }
  }
}
