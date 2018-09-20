import { Request, Response, Router } from 'express';
import { AxiosInstance } from 'axios';
import ProjectController from '../controllers/Project';

export default class Project {
  private api: AxiosInstance;
  public router: Router;

  constructor(api: AxiosInstance) {
    this.api = api;
    this.router = Router();
    this.list();
    this.status();
    this.performance();
    this.detail();
  }

  private list() {
    this.router
      .get('/', (req: Request, res: Response) => new ProjectController(this.api, req, res).getList())
  }

  private status() {
    this.router
      .get('/status', (req: Request, res: Response) => new ProjectController(this.api, req, res).getStatus())
  }

  private performance() {
    this.router
      .get('/performance', (req: Request, res: Response) => new ProjectController(this.api, req, res).getPerformance())
  }

  private detail() {
    this.router
      .get('/:key', (req: Request, res: Response) => new ProjectController(this.api, req, res).getDetail())
  }
}