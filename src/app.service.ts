import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  getHello(): string {
    return `¡Hola Mundo! ${this.configService.apiKey} Database: ${this.configService.database.host}`;
  }
  getKiki(): string {
    return 'Kiki crack';
  }
}
