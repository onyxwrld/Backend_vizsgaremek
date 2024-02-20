import { Module } from '@nestjs/common';
import { BicycleService } from './bicycle.service';
import { BicycleController } from './bicycle.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [BicycleController],
  providers: [BicycleService,PrismaService],
})
export class BicycleModule {}
