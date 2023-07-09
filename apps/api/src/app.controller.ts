import { Controller, Get } from '@nestjs/common';
import { Roles, Public } from 'nest-keycloak-connect';
import { AppService } from './app.service';

@Controller("/api")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/hello")
  @Roles({ roles: ['Admin'] })
  // @Public()
  getHello(): string {
    return this.appService.getHello();
  }
}
