import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { CreateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id: id });
  }

  findByFullName(firstName: string, lastName: string) {
    return this.userRepository.findOneBy({
      firstName: firstName,
      lastName: lastName,
    });
  }

  create(user: CreateUserParams) {
    const newUser = this.userRepository.create({ ...user });
    return this.userRepository.save(newUser);
  }

  update() {
    // TODO: implement this method to update a user in the database
  }

  delete() {
    // TODO: implement this method to delete a user from the database
  }
}
