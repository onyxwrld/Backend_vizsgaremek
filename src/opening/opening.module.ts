import { Module } from '@nestjs/common';
import { OpeningService } from './opening.service';
import { OpeningController } from './opening.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [OpeningController],
  providers: [OpeningService,PrismaService],
})
export class OpeningModule {}
