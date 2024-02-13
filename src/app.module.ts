import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { BeercycleModule } from './beercycle/beercycle.module';
import { UserModule } from './user/user.module';
import { WorkerModule } from './worker/worker.module';
import { OrderModule } from './order/order.module';
import { BicycleModule } from './bicycle/bicycle.module';

@Module({
  imports: [BeercycleModule, UserModule, WorkerModule, OrderModule, BicycleModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
