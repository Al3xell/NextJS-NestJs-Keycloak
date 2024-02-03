import { Controller, Get } from '@nestjs/common';
import { Roles } from 'nest-keycloak-connect';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  @Roles({ roles: ['admin'] })
  // @Public()
  getHello(): string {
    return this.appService.getHello();
  }
}
