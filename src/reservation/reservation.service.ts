import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { PrismaService } from 'src/prisma.service';
@Injectable()
export class ReservationService {
  constructor(private readonly db: PrismaService) { }
  async create(createReservationDto: CreateReservationDto, user_id: number) {
    const reservations = await this.db.reservation.create({
      include: {
        user: {
          include:
          {
            basket:
            {
              include:
              {
                menu:
                {
                  select:
                  {
                    price:true
                  }
                }
              }
            }
          }
        }
      }
    ,
      data: {
        state: "Pending",
        start_time: createReservationDto.start_time,
        end_time:createReservationDto.end_time,
        reservation_time:createReservationDto.reservation_time,
        total_amount: 0,
        user:{
          connect:{
            id:user_id
          }
        },
      },
    });
    for (let reservation of reservations){
      let total_sum = 0;
        for(let users of reservation.user.basket){
          
          for(let menuitems of users.menu ){
            total_sum += menuitems.price
          }
          
        }
        ;reservation.total_amount = total_sum;
     } 
     return reservations;
  }

  async findAll(user_id:number) {
    const reservations = await  this.db.reservation.findMany({
      include: {
        user: {
          include:
          {
            basket:
            {
              include:
              {
                menu:
                {
                  select:
                  {
                    price:true
                  }
                }
              }
            }
          }
        }
      },where:{user_id}});

     for (let reservation of reservations){
      let total_sum = 0;
        for(let users of reservation.user.basket){
          
          for(let menuitems of users.menu ){
            total_sum += menuitems.price
          }
          
        }
        ;reservation.total_amount = total_sum;
     } 
     return reservations;
  }

  findOne(id: number) {
    return this.db.reservation.findUniqueOrThrow(
      {
        where: { id }
      }
    );
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return this.db.reservation.update({
      data: updateReservationDto,
      where: { id }
    })
  }

  remove(id: number) {
    return this.db.reservation.delete(
      {
        where: { id }
      }
    );
  }
}
