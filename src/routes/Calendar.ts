import { Request, Response, Application } from 'express';
import CalendarController from '../controllers/Calendar';

export default class Calendar {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
    this.list();
    this.detail();
    this.create();
  }

  private list() {
    this.app.route('/calendar/list/:year/:month?/:date?')
      .get((req: Request, res: Response) => {
        const calendar: CalendarController = new CalendarController(req, res);
        calendar.list();
      });
  }

  private detail() {
    this.app.route('/calendar/:id')
      .get((req: Request, res: Response) => {
        const calendar: CalendarController = new CalendarController(req, res);
        calendar.detail();
      })
  }

  private create() {
    this.app.route('/calendar')
      .post((req: Request, res: Response) => {
        const calendar: CalendarController = new CalendarController(req, res);
        calendar.create();
      })
  }
}