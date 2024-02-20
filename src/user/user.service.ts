import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly db: PrismaService){}
  create(createUserDto: CreateUserDto) {
    return this.db.user.create({
      data: createUserDto
    })
  }

  findAll() {
    return this.db.user.findMany();
  }

  findOne(id: number) {
    return this.db.user.findUniqueOrThrow({
      where: {id}
    })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.db.user.update({
      data: updateUserDto,
      where: {id}
    })
  }

  remove(id: number) {
    return this.db.user.delete({
      where: {id}
    })
  }
}
