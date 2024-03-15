import { Injectable } from '@nestjs/common';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { PrismaService } from 'src/prisma.service';
import { Menu, User } from '@prisma/client';

@Injectable()
export class BasketService {
  constructor (private readonly db: PrismaService){

  }
  async create( menuItems: Menu[],user:number) {
    
    try {
      await this.db.basket.deleteMany({});
      const basket = await this.db.basket.create({
        data: {
          total_amount: 0,
          menu: {
            connect: menuItems.map((menuItem) => (
              { id: menuItem.id }
              )),
          },
          user: {
             connect: { 
              id: user } },
        },
      });
      await this.db.user.update({
        where: { id: user },
        data: { basket: { connect: { id: basket.id } } },
      });
      return basket;
    } catch (error) {
      // Hibakezelés
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
