import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { PrismaService } from 'src/prisma.service';
@Injectable()
export class ReservationService {
  constructor(private readonly db: PrismaService) { }
  create(createReservationDto: CreateReservationDto, user_id: number) {
    return this.db.reservation.create({
      include: {
        user: {
          select: { basket: true } 
        }
      },
      data: {
        state: "Pending",
        start_time: createReservationDto.start_time,
        end_time:createReservationDto.end_time,
        reservation_time:createReservationDto.reservation_time,
        user:{
          connect:{
            id:user_id
          }
        },
      }
    });
  }

  findAll(user_id:number) {
    return this.db.reservation.findMany({
      include: {
        user: {
          select: { basket: {
            select:{
              menu:true,total_amount:true
            }
          } } 
        }
      },where:{user_id}});
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
