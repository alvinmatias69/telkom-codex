import { Request, Response, Router } from 'express';
import CalendarController from '../controllers/Calendar';

export default class Calendar {
  public router: Router;

  constructor() {
    this.router = Router();
    this.list();
    this.detail();
    this.create();
  }

  private list() {
    this.router
      .get('/list/:year/:month?/:date?', (req: Request, res: Response) =>
        new CalendarController(req, res).list()
      );
  }

  private detail() {
    this.router
      .get('/:id', (req: Request, res: Response) =>
        new CalendarController(req, res).detail()
      )
  }

  private create() {
    this.router
      .post('/', (req: Request, res: Response) =>
        new CalendarController(req, res).create()
      )
  }
}