import { Controller, Get, Req, Res } from '@nestjs/common';
import { Roles, Public } from 'nest-keycloak-connect';
import { AppService } from './app.service';
import { RequestUser } from './user/middleware/user.middleware';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/hello")
  @Roles({ roles: ['admin'] })
  // @Public()
  getHello(@Req() req: RequestUser): string {
    console.log(req.userInfo)
    return this.appService.getHello();
  }
}
