import express, {Application} from 'express';

import UserController from './controllers/UserController';
import UserRepository from './repositories/UserRepository';
import UserRouter from './routes/UserRoutes';
import UserService from './services/UserService';

import EmployerRepository from './repositories/EmployerRepository';
import EmployerService from './services/EmployerService';
import EmployerController from './controllers/EmployerController';
import EmployerRouter from './routes/EmployerRoutes';

import EmployeeRepository from './repositories/EmployeeRepository';
import EmployeeService from './services/EmployeeService';
import EmployeeController from './controllers/EmployeeController';
import EmployeeRouter from './routes/EmployeeRoutes';

import JobRepository from './repositories/JobRepository';
import JobService from './services/JobService';
import JobController from './controllers/JobController';
import JobRouter from './routes/JobRoutes';

import BookmarkRepository from './repositories/BookmarkRepository';
import BookmarkService from './services/BookmarkService';
import BookmarkController from './controllers/BookmarkController';
import BookmarkRouter from './routes/BookmarkRoutes';

import ExperienceRepository from './repositories/ExperienceRepository';
import ExperienceService from './services/ExperienceService';

import AuthenticationController from './controllers/AuthenticationController';
import AuthenticationRoutes from './routes/AuthenticationRoutes';
import AuthenticationMiddleware from './middlewares/authentication';

import sequelize from './db';
import models from './models';

import Container from './utils/container';

export default class App {
  public app: Application;

  constructor() {
    this.app = express();
  }

  public initMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}));
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, DELETE'
      );
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, x-auth-token'
      );
      next();
    });
  }

  public initModels() {
    Object.keys(models).forEach(key => {
      models[key].initModel(Container.getInstance().get('db'));
    });

    Object.keys(models).forEach(key => {
      if ('associate' in models[key]) {
        models[key].associate(models);
      }
    });
  }

  public initControllers() {
    this.app.use('/users', UserRouter());
    this.app.use('/employers', EmployerRouter());
    this.app.use('/employees', EmployeeRouter());
    this.app.use('/jobs', JobRouter());
    this.app.use('/bookmarks', BookmarkRouter());
    this.app.use('/', AuthenticationRoutes());
  }

  public async initContainer() {
    const container = Container.getInstance();
    container.register('db', sequelize, []);

    // Repositories
    container.register('UserRepository', UserRepository, ['db']);
    container.register('EmployerRepository', EmployerRepository, ['db']);
    container.register('EmployeeRepository', EmployeeRepository, ['db']);
    container.register('JobRepository', JobRepository, ['db']);
    container.register('BookmarkRepository', BookmarkRepository, ['db']);
    container.register('ExperienceRepository', ExperienceRepository, ['db']);

    // Services
    container.register('UserService', UserService, ['UserRepository']);
    container.register('EmployerService', EmployerService, [
      'EmployerRepository',
    ]);
    container.register('EmployeeService', EmployeeService, [
      'EmployeeRepository',
    ]);
    container.register('JobService', JobService, ['JobRepository']);
    container.register('BookmarkService', BookmarkService, [
      'BookmarkRepository',
    ]);
    container.register('ExperienceService', ExperienceService, [
      'ExperienceRepository',
    ]);

    // Controllers
    container.register('UserController', UserController, ['UserService']);
    container.register('EmployerController', EmployerController, [
      'EmployerService',
      'JobService',
    ]);
    container.register('EmployeeController', EmployeeController, [
      'EmployeeService',
      'ApplicationService',
    ]);
    container.register('JobController', JobController, [
      'JobService',
      'ApplicationService',
    ]);
    container.register('AuthenticationController', AuthenticationController, [
      'UserService',
    ]);
    container.register('BookmarkController', BookmarkController, [
      'BookmarkService',
    ]);

    // Middlewares
    container.register('AuthenticationMiddleware', AuthenticationMiddleware, [
      'UserService',
    ]);
  }

  public listen(port: string) {
    this.app.listen(port, () => {
      console.log(`⚡️[server]: Server is running on port ${port}`);
    });
  }
}
