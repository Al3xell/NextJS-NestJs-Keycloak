import { Injectable } from '@nestjs/common';
import { Roles } from 'nest-keycloak-connect';

@Injectable()
@Roles({ roles: ['Admin'] })
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
