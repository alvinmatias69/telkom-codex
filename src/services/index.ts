import axios, { AxiosInstance } from 'axios';

export default class Service {
  public api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'http://jira-telkomdds-devops-playground.apps.playcourt.id/rest/api/2/',
      timeout: 1000,
      headers: {
        auth: {
          username: 'devchallenge',
          password: 'dev12345'
        }
      }
    })
  }
}