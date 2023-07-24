import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/user.service';

export interface UserInfo {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string
}

export interface RequestUser extends Request {
  userInfo: UserInfo
}

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}

  async use(req: RequestUser, res: Response, next: NextFunction) {
    // console.log('Request...');
    // console.log(req.get('userInfo'));
    const userInfo: UserInfo = JSON.parse(req.get('userInfo'));
    const dbRequest = await this.userService.findByFullName(userInfo.firstName, userInfo.lastName);
    if(!dbRequest) {
      const userDetails = {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        phone: userInfo.phone,
      }
      await this.userService.create(userDetails);
    }
    const user = await this.userService.findByFullName(userInfo.firstName, userInfo.lastName); 
    // res.set('userInfo', {
    //   ...userInfo, id: user.id
    // });
    req.userInfo = {
      ...userInfo, id: user.id
    }
    next();
  }
}
