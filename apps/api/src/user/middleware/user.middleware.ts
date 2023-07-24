import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/user.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    console.log(req.get('userInfo'));
    const userInfo = JSON.parse(req.get('userInfo'));
    const dbRequest = await this.userService.findByFullName(
      userInfo.firstName,
      userInfo.lastName,
    );
    if (!dbRequest) {
      const userDetails = {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        phone: userInfo.phone,
      };
      this.userService.create(userDetails);
    }
    next();
  }
}
