import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { WorkerModule } from './worker/worker.module';
import { OrderModule } from './order/order.module';
import { TorzsAdatokModule } from './torzs-adatok/torzs-adatok.module';
import { BicycleModule } from './bicycle/bicycle.module';
import { ReservationModule } from './reservation/reservation.module';
@Module({
  imports: [BicycleModule, UserModule, WorkerModule, OrderModule, TorzsAdatokModule, BicycleModule, ReservationModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
