import { Request, Response } from 'express';
import { AxiosInstance, AxiosResponse } from "axios";
import { simulatedAnealing, svm, naiveBayes } from '../lib/TensorFlow';

const statusOrder: any = {
  'To Do': 0,
  'In Progress': 1,
  'Done': 2
};

const statuses: string[] = ['To Do', 'In Progress', 'Done'];

export default class Project {
  private api: AxiosInstance;
  private req: Request;
  private res: Response;
  public list: any;

  constructor(api: AxiosInstance, req: Request, res: Response) {
    this.list = {};
    this.api = api;
    this.req = req;
    this.res = res;
  }

  public getList() {
    this.api.get('project?expand=lead')
      .then((res: AxiosResponse) => this.finishRequest(null, this.processProjectList(res.data)));
  }

  public getStatus() {
    const key = this.req.query.key.split(',');
    const promises = key.map((item: string) =>
      this.api.get(`search?jql=project="${item}"&fields=status`)
        .then((res: AxiosResponse) => {
          const { issues } = res.data;
          const status = issues.reduce((acc: number, cur: any) => {
            const { name } = cur.fields.status.statusCategory;
            if (statusOrder[name] < acc) {
              return statusOrder[name];
            }
            return acc;
          }, 4);
          this.list[item] = statuses[status];
        })
    );
    Promise.all(promises).then(() => this.finishRequest(null, this.list));
  }

  public getPerformance() {
    this.api.get('project')
      .then((res: AxiosResponse) => this.finishRequest(null, res.data.map((item: any) => ({
        name: item.name,
        status: svm(),
        performance: simulatedAnealing(0, 30),
      }))));
  }

  public getDetail() {
    const { key } = this.req.params;
    this.api.get(`project/${key}?expand=lead`)
      .then((res: AxiosResponse) => {
        const { data } = res;
        const start = naiveBayes(new Date(2018, 0, 1), new Date());
        this.finishRequest(null, {
          name: data.name,
          description: data.description,
          stakeholder: data.lead.name,
          sprint: simulatedAnealing(1, 50),
          start,
          end: naiveBayes(start, new Date()),
        });
      });
  }

  private processProjectList(data: any[]) {
    return data.reduce((acc, cur) => {
      if (!cur.archived) {
        const project = {
          name: cur.name,
          key: cur.key,
          unit: cur.lead.name,
          stakeholder: cur.lead.name,
          sprint: simulatedAnealing(0, 100)
        };
        acc.push(project);
      }
      return acc;
    }, [])
  }

  private finishRequest(err: any, res: any) {
    if (err) {
      this.res.status(500).send({ message: 'Server internal error' });
    } else {
      this.res.status(200).send(res);
    }
  }
}