import { Application } from 'express';
import { AxiosInstance } from 'axios';
import Service from '../services';
import Calendar from './Calendar';

export default class Routes {
  private app: Application;
  private api: AxiosInstance;

  constructor(app: Application) {
    this.app = app;
    this.api = new Service().api;

    this.app.use('/calendar', new Calendar().router);
  }
}