import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ReservationService {
  constructor (private readonly db:PrismaService){

  }
  create(createReservationDto: CreateReservationDto) {
    return 'This action adds a new reservation';
  }

  findAll() {
    return this.db.reservation.findMany();
  }

  findOne(id: number) {
    return this.db.reservation.findUnique(
      {
        where: {id},
        include: {
            user: true,
            order: true,
            worker: true
        }
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
