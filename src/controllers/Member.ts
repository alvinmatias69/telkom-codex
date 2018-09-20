import { Request, Response } from 'express';
import { AxiosInstance, AxiosResponse } from "axios";
import { simulatedAnealing } from '../lib/TensorFlow';

export default class Member {
  private api: AxiosInstance;
  private req: Request;
  private res: Response;
  private list: any[];

  constructor(api: AxiosInstance, req: Request, res: Response) {
    this.api = api;
    this.req = req;
    this.res = res;
    this.list = [];
  }

  public getMember() {
    const { key } = this.req.params;
    this.api.get(`project/${key}`)
      .then((res: AxiosResponse) => {
        const { roles } = res.data;
        const promises = [];
        for (const key in roles) {
          let url = roles[key].split('/')
          url = url.slice(url.length - 4, url.length).join('/')
          promises.push(this.api.get(url).then((roleRes: any) => {
            const { actors, name } = roleRes.data;
            actors.forEach((actor: any) => {
              this.list.push({
                name: actor.name,
                id: actor.id,
                avatar: actor.avatarUrl,
                stream: name,
                ...this.generatePerfornmance()
              })
            })
          }))
        }
        Promise.all(promises).then(() => this.finishRequest(null, this.list));
      })
  }

  public getDetail() {
    const { periode } = this.req.query;
    const level = simulatedAnealing(0, 5);
    const intensity = [];
    for (let index = 0; index < periode; index++) {
      intensity.push(this.generatePerfornmance())
    }
    this.finishRequest(null, { level, intensity });
  }

  private generatePerfornmance() {
    return {
      burn: simulatedAnealing(0, 15),
      remaining: simulatedAnealing(0, 15),
      queue: simulatedAnealing(0, 15),
    }
  }

  private finishRequest(err: any, res: any) {
    if (err) {
      this.res.status(500).send({ message: 'Server internal error' });
    } else {
      this.res.status(200).send(res);
    }
  }
}