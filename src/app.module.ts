import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { BeercycleModule } from './beercycle/beercycle.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [BeercycleModule, UserModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
