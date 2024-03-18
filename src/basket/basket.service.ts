import { Injectable } from '@nestjs/common';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { PrismaService } from 'src/prisma.service';
import { Menu, User } from '@prisma/client';

@Injectable()
export class BasketService {
  constructor (private readonly db: PrismaService){

  }
  async create(menuPrice:number,menu:number,user:number) {
    try {
      const basket = await this.db.basket.create({
        data: {
          total_amount: menuPrice ,
          menu: {
            connect:{
              id: menu
            }
          },
          user: {
             connect: { 
              id: user } },
        },
      });
      return basket;
    } catch (error) {
      throw new Error(`Failed to create basket: ${error.message}`);
    }
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
