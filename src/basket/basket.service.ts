import { Injectable } from '@nestjs/common';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { PrismaService } from 'src/prisma.service';
import { Menu, User } from '@prisma/client';

@Injectable()
export class BasketService {
  constructor(private readonly db: PrismaService) {

  }
  async create( menu: number, user: number) {
    try {
      const existingBasket = await this.db.basket.findFirst({
        where: { userId: user }
      });

      if (existingBasket) {
        const basket = await this.db.basket.update({
          data: {
            menu: {
              connect: {
                id: menu
              }
            }
          },
          where: {
            id: (await existingBasket).id
          } 
        }
        )
        return basket;
      } else {
        const newbasket = await this.db.basket.create({
          data: {
            user: {
              connect: {
                id: user
              }
            },
            menu: {
              connect: {
                id: menu
              }
            }
          }
        });
        return newbasket;
      }
    } catch (error) {
      throw new Error(`Failed to create basket: ${error.message}`);
    }
  }

  findAll(userId: number) {
    return this.db.basket.findMany({
      include: {
        menu: true
      },
      where: { userId }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} basket`;
  }

  updateitems(id: number,menu:number,) {
    return this.db.basket.update({
      where:{id},
      data:{
        menu:{
          disconnect:{ id: menu}
        }
      }
    });
  }
  update(userId:number){
    return this.db.basket.update({
      where:{id:userId},
      data:{
        deleted:true
      }
    })
  }

  remove(id: number) {
    return `This action removes a #${id} basket`;
  }
}
