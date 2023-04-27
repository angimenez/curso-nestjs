import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '¡Hola Mundo!';
  }
  getKiki(): string {
    return 'Kiki crack';
  }
}
