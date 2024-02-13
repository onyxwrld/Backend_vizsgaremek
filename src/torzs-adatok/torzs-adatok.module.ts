import { Module } from '@nestjs/common';
import { TorzsAdatokService } from './torzs-adatok.service';
import { TorzsAdatokController } from './torzs-adatok.controller';

@Module({
  controllers: [TorzsAdatokController],
  providers: [TorzsAdatokService],
})
export class TorzsAdatokModule {}
