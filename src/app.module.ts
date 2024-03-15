import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { TorzsAdatokModule } from './torzs-adatok/torzs-adatok.module';
import { BicycleModule } from './bicycle/bicycle.module';
import { ReservationModule } from './reservation/reservation.module';
import { OpeningModule } from './opening/opening.module';
import { MenuModule } from './menu/menu.module';
import { AuthModule } from './auth/auth.module';
import { ReviewModule } from './review/review.module';
import { BasketModule } from './basket/basket.module';
@Module({
  imports: [BicycleModule, UserModule, 
    TorzsAdatokModule, BicycleModule, ReservationModule, OpeningModule, MenuModule, AuthModule, ReviewModule, BasketModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
