import { Application } from 'express';
import { AxiosInstance } from 'axios';
import Service from '../services';
import Calendar from './Calendar';
import Project from './Project';
import Member from './Member';

export default class Routes {
  private app: Application;
  private api: AxiosInstance;

  constructor(app: Application) {
    this.app = app;
    this.api = new Service().api;

    this.app.use('/calendar', new Calendar().router);
    this.app.use('/project', new Project(this.api).router);
    this.app.use('/member', new Member(this.api).router);
  }
}