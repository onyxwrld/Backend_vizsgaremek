import { Injectable } from '@nestjs/common';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BasketService {
  constructor (private readonly db: PrismaService){

  }
  create(createBasketDto: CreateBasketDto,menuId:number,userId:number) {
    return this.db.basket.create({
      data:{
        total_amount:createBasketDto.total_amount,
        menu:{
          connect:{
            id: menuId
          }
        },
        user:{
          connect:{
            id:userId
          }
        }
      }
    });
  }

  findAll() {
    return `This action returns all basket`;
  }

  findOne(id: number) {
    return `This action returns a #${id} basket`;
  }

  update(id: number, updateBasketDto: UpdateBasketDto) {
    return `This action updates a #${id} basket`;
  }

  remove(id: number) {
    return `This action removes a #${id} basket`;
  }
}
