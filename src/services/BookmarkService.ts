import {
  BookmarkAttributes,
  BookmarkCreationAttributes,
} from '../models/Bookmark';
import BookmarkRepository from '../repositories/BookmarkRepository';
import Bookmark from '../models/Bookmark';

export default class BookmarkService {
  private bookmarkRepository: BookmarkRepository;

  constructor(bookmarkRepository: BookmarkRepository) {
    this.bookmarkRepository = bookmarkRepository;
  }

  async getAllBookmarks() {
    return this.bookmarkRepository.getAll() as unknown as Bookmark[];
  }

  async getOneBookmarkById(id: number) {
    return (await this.bookmarkRepository.getWithFilters({id}))[0] as Bookmark;
  }

  async createOneBookmark(bookmark: BookmarkCreationAttributes) {
    return (await this.bookmarkRepository.createOne(bookmark)) as Bookmark;
  }

  async updateOneBookmarkById(id: number, attrs: BookmarkAttributes) {
    return this.bookmarkRepository.updateOne(attrs, {id});
  }

  async deleteOneBookmarkById(id: number) {
    return this.bookmarkRepository.deleteOne({id});
  }
}
