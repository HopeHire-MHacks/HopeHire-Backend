import {NextFunction, Request, Response} from 'express';
import userFriendlyMessage from '../consts/userFriendlyMessages';
import JobService from '../services/JobService';
import {JobAttributes, JobCreationAttributes} from '../models/Job';
import enviroment from '../consts/enviroment';
import axios from 'axios';

export default class JobController {
  private jobService: JobService;

  constructor(jobService: JobService) {
    this.jobService = jobService;
  }

  async getAllJobs(req: Request, res: Response, next: NextFunction) {
    try {
      const jobs = (await this.jobService.getAllJobs()) || [];
      res.json({
        message: userFriendlyMessage.success.getAllJobs,
        data: jobs,
      });
    } catch (e) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.getAllJobs});
      next(e);
    }
  }

  async getAllJobsRecommended(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(enviroment.recommendationAPI + "/patients/" + req.body.employee_id)
      const response = await axios.get(
        "http://localhost:5000/patients/" + req.body.employee_id
      );
      const job_ids: any = response.data['listing_ids']
      console.log(job_ids)
        
      const jobs = (this.jobService.getMultipleJobsByIdWithEmployer(job_ids));
      jobs.then(data => {
        res.json({
          message: userFriendlyMessage.success.getAllJobs,
          data: data,
        });
      })
      
    } catch (e) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.getAllJobs});
      next(e);
    }
  }

  async getOneJobById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const job = await this.jobService.getOneJobById(id);
      res.json({
        message: userFriendlyMessage.success.getOneJob,
        data: job,
      });
    } catch (e) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.getOneJob});
      next(e);
    }
  }

  async getMultipleJobById(req: Request, res: Response, next: NextFunction) {
    try {
      const jobs = await this.jobService.getMultipleJobsByIdWithEmployer(
        req.body.ids
      );

      res.json({
        message: userFriendlyMessage.success.getMultipleJobs,
        data: jobs,
      });
    } catch (e) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.getMultipleJobs});
      next(e);
    }
  }

  async createOneJob(req: Request, res: Response, next: NextFunction) {
    try {
      const toCreate: JobCreationAttributes = {
        employerId: req.user.employer!.id,
        ...req.body,
      };
      const createdJob = await this.jobService.createOneJob(toCreate);
      res.status(201);
      res.json({
        message: userFriendlyMessage.success.createJob,
        data: createdJob,
      });
    } catch (e) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.createJob});
      next(e);
    }
  }

  async updateOneJobById(req: Request, res: Response, next: NextFunction) {
    try {
      const jobId = parseInt(req.params.id);
      const oldJob = await this.jobService.getOneJobById(jobId);
      const toUpdate: JobAttributes = {
        ...oldJob,
        ...req.body,
      };

      const job = await this.jobService.updateOneJobById(jobId, toUpdate);
      res.json({
        message: userFriendlyMessage.success.updateJob,
        data: job,
      });
    } catch (e) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.updateJob});
      next(e);
    }
  }

  async deleteOneJobById(req: Request, res: Response, next: NextFunction) {
    try {
      const jobId = parseInt(req.params.id);
      await this.jobService.deleteOneJobById(jobId);
      res.json({message: userFriendlyMessage.success.deleteJob});
    } catch (e) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.deleteJob});
      next(e);
    }
  }
}
