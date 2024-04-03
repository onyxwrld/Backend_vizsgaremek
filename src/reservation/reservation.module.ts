import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { PrismaService } from 'src/prisma.service';
import { BasketService } from 'src/basket/basket.service';

@Module({
  controllers: [ReservationController],
  providers: [ReservationService,PrismaService,BasketService],
})
export class ReservationModule {}
