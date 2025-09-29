import { Controller, Get, Post } from '@nestjs/common';
// import { AppService } from './app.service';

@Controller("app")
export class AppController {
  constructor(/*private readonly appService: AppService*/) {}

  @Get("/obtener")
  getHello() {
    return {
      mensaje: "Hello world"
    }
  }

  @Post()
  postHello() {
    return {
      mensaje: "POST..."
    }
  }
}
