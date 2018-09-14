import express from 'express';
import * as bodyParser from 'body-parser';
import Routes from './routes';
import { connect } from 'mongoose';

class App {
  public app: express.Application;
  private mongoUrl: string = 'mongodb://mat:qwe123123@ds215502.mlab.com:15502/telkom_codex';

  constructor() {
    this.app = express();
    this.config();
    this.mongoSetup();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private mongoSetup(): void {
    connect(this.mongoUrl, { useNewUrlParser: true }, () => new Routes(this.app));
  }
}

export default new App().app;