import { Module } from '@nestjs/common';
import { BicycleService } from './bicycle.service';
import { BicycleController } from './bicycle.controller';

@Module({
  controllers: [BicycleController],
  providers: [BicycleService],
})
export class BicycleModule {}
