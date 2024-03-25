import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { hash } from 'argon2';
import { ChangePassDto } from './dto/changepass.dto';

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
        role:'User', 
      }
    })
  }
  async createAdmin(createUserDto: CreateUserDto) {
    return this.db.user.create({
      data: {
        ...createUserDto,
        password: await hash(createUserDto.password),
        role:"Admin",
       
        
      }
    })
  }

  findAll() {
    return this.db.user.findMany();
  }

  findOne(id: number) {
    return this.db.user.findUnique({
      where: {id}
    })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.db.user.update({
      data: {email:updateUserDto.email,
      first_name:updateUserDto.first_name,
      last_name:updateUserDto.last_name,
      username:updateUserDto.username},
      where: {id}
    })
  }
  updateRole(id: number, updateUserDto: UpdateUserDto){
    return this.db.user.update({
      data: {role:updateUserDto.role},
      where: {id}
    })
  }

  async updatePass(id: number, changePassDto: ChangePassDto){
    return this.db.user.update({
      data: {password:changePassDto.newpass},
      where:{id}

    })

  }

 async remove(id: number) {
 
    await this.db.review.deleteMany({
      where: {
        userId: id
      }
    });
    return this.db.user.delete({
      where: {id}
    })
  }
}
