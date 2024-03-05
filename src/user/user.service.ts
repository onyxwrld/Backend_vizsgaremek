import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly db: PrismaService){}
  findByUsername(username: string) {
    return this.db.user.findFirst({
      where: {
        username
      }
    });
  }
  findByUserEmail(email: string) {
    return this.db.user.findUnique({
      where: {email}
    })
  }
   async createUser(createUserDto: CreateUserDto) {
    return this.db.user.create({
      data: {
        ...createUserDto,
        password: await hash(createUserDto.password),
        role:"User",
       
        
      }
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
