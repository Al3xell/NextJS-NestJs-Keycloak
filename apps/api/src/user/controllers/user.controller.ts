import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/CreateUser.dto';
import { UserService } from '../services/user.service';
import { Public } from 'nest-keycloak-connect';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @Public()
  getUsers(
    @Query('id') id?: number,
    @Query('firstName') firstName?: string,
    @Query('lastName') lastName?: string,
  ) {
    if (id) return this.userService.findOne(id);
    if (firstName && lastName)
      return this.userService.findByFullName(firstName, lastName);
    return this.userService.findAll();
  }

  @Post()
  @Public()
  createUser(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  @Put(':id')
  updateUser() {
    // TODO: implement this method to update a user in the database
  }

  @Delete(':id')
  deleteUser() {
    // TODO: implement this method to delete a user from the database
  }
}
