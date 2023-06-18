import { Controller, Get, Param, Inject } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * Los controladores le dicen a Nest que la clase es un controlador,
 * los mismos se encargan de manejar las request y
 * validar que todo esté bien antes de pasarlo a un service y obtener información
 */
@Controller() // Los @decorators indican cosas
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: any[],
  ) {}

  @Get()
  getHello(): string {
    console.log(this.tasks);
    return this.appService.getHello() + this.apiKey;
  }

  @Get('kiki')
  getKiki(): string {
    return this.appService.getKiki();
  }

  @Get('tasks')
  getTasks() {
    return this.appService.getTasks();
  }

  // Para recibir parámetros
  @Get('/things/:id')
  getThings(@Param('id') id: string) {
    return `Things ${id}`;
  }

  // Otra forma de recibir parámetros
  @Get('/things/:id/:algo')
  getOtherThing(@Param() params: any) {
    return `Things ${params.id} and algo is ${params.algo}`;
  }
}
