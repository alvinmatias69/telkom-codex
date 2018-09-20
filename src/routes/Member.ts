import { Request, Response, Router } from 'express';
import { AxiosInstance } from 'axios';
import MemberController from '../controllers/Member';

export default class Member {
  private api: AxiosInstance;
  public router: Router;

  constructor(api: AxiosInstance) {
    this.api = api;
    this.router = Router();
    this.list();
  }

  private list() {
    this.router
      .get('/:key', (req: Request, res: Response) => new MemberController(this.api, req, res).getMember())
  }
}