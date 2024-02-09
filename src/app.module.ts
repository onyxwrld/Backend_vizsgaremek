import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { BeercycleModule } from './beercycle/beercycle.module';

@Module({
  imports: [BeercycleModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
