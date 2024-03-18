import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { PrismaService } from 'src/prisma.service';
import { CreateBasketDto } from 'src/basket/dto/create-basket.dto';

@Injectable()
export class ReservationService {
  constructor (private readonly db:PrismaService,private readonly createBasketDTO: CreateBasketDto){

  }
   create(createReservationDto: CreateReservationDto,user_id:number) {
     return this.db.reservation.create({
      data: {
        
        user:{
          connect:{
            id: user_id
          }
        },
        state: "Pending",
        ...createReservationDto
      }
    });
  }

  findAll() {
    return this.db.reservation.findMany();
  }

  findOne(id: number) {
    return this.db.reservation.findUniqueOrThrow(
      {
        where: {id}
      }
    );
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return this.db.reservation.update({
      data: updateReservationDto,
      where: {id}
    })
  }

  remove(id: number) {
    return this.db.reservation.delete(
      {
        where: { id}
      }
    );
  }
}
