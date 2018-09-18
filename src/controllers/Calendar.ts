import { Request, Response } from 'express';
import { model, Document } from 'mongoose';
import CalendarSchema from '../models/Calendar';
const CalendarModel = model('Calendar', CalendarSchema);

export default class Calendar {
  private req: Request;
  private res: Response;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
  }

  public list() {
    const { date = null, month = null, year } = this.req.params;
    const dateQuery = !!date ? date : { $exists: true };
    const monthQuery = !!month ? month : { $exists: true };

    CalendarModel
      .find({
        date: dateQuery,
        month: monthQuery,
        year
      })
      .select('_id due_date notes location')
      .exec((err, res) => this.finishRequest(err, this.parseResponse(res)))
  }

  public detail() {
    const { id: _id } = this.req.params;

    CalendarModel
      .find({
        _id
      })
      .select('_id due_date notes location')
      .exec((err, res) => this.finishRequest(err, this.parseResponse(res, true)))
  }

  public create() {
    const { notes, location, dueDate } = this.req.body;
    const date = new Date(parseInt(dueDate));

    const calendarObject = new CalendarModel({
      notes,
      location,
      due_date: dueDate,
      date: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear()
    })

    calendarObject.save((err: any) => this.finishRequest(err, { message: 'Success add notes' }))
  }

  private parseResponse(res: Document[], detail: boolean = false) {
    const response = res.map(item => {
      const newRes = item.toObject();
      newRes.dueDate = new Date(newRes.due_date).toJSON()
      newRes.id = newRes._id;
      delete newRes.due_date;
      delete newRes._id;
      return newRes;
    });
    return detail && response.length > 0 ? response[0] : response;
  }

  private finishRequest(err: any, res: any) {
    if (err) {
      this.res.status(500).send({ message: 'Server internal error' });
    } else {
      this.res.status(200).send(res);
    }
  }
}