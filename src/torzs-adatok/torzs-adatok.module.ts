import { Module } from '@nestjs/common';
import { TorzsAdatokService } from './torzs-adatok.service';
import { TorzsAdatokController } from './torzs-adatok.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TorzsAdatokController],
  providers: [TorzsAdatokService, PrismaService],
})
export class TorzsAdatokModule {}
