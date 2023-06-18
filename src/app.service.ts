import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';
import { Db } from 'mongodb';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @Inject('MONGO') private mongoDB: Db,
  ) {}

  getHello(): string {
    return `¡Hola Mundo! ${this.configService.apiKey} Database: ${this.configService.database.host}`;
  }

  getTasks() {
    const taskCollection = this.mongoDB.collection('tasks');
    return taskCollection.find().toArray();
  }

  getKiki(): string {
    return 'Kiki crack';
  }
}
