import { Module } from '@nestjs/common';
import { BeercycleService } from './beercycle.service';
import { BeercycleController } from './beercycle.controller';

@Module({
  controllers: [BeercycleController],
  providers: [BeercycleService],
})
export class BeercycleModule {}
