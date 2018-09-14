import { AxiosInstance, AxiosResponse } from "axios";

export default class Project {
  public list: string[];
  private api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.list = [];
    this.api = api;
  }

  public getList() {
    this.api.get('project').then((res: AxiosResponse) => console.log({ res }));
    this.list = ['a', 'b'];
  }
}