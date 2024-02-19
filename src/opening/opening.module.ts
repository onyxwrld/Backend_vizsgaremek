import { Module } from '@nestjs/common';
import { OpeningService } from './opening.service';
import { OpeningController } from './opening.controller';

@Module({
  controllers: [OpeningController],
  providers: [OpeningService],
})
export class OpeningModule {}
