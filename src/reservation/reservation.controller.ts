import { Controller, Get, Post, Body, Patch, Param, Delete, Request, BadRequestException, UseGuards, ForbiddenException } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { BasketService } from 'src/basket/basket.service';

@Controller('reservation')
export class ReservationController {
  constructor(
    private readonly reservationService: ReservationService,
    private readonly basketService: BasketService) { }

    @Get('allRes')
    @UseGuards(AuthGuard('bearer'))
    findAllres(@Request() req) {
      const user: User = req.user;
      if (user.role !== 'Admin') {
        throw new ForbiddenException('Nincs megfelelő jogosultság az összes foglalás lekérdezéséhez');
      }
      return this.reservationService.findAllres();
    }
    @Patch(':id/state')
@UseGuards(AuthGuard('bearer'))
async updateState(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto, @Request() req) {
  const user: User = req.user;
  if (user.role !== 'Admin') {
    throw new ForbiddenException('Only admins can update reservation state.');
  }
  return await this.reservationService.updateState(+id, updateReservationDto);
}
  @Post()
  @UseGuards(AuthGuard('bearer'))
  async create(@Body() createReservationDto: CreateReservationDto, @Request() req) {
    const createdReservation = await this.reservationService.create(createReservationDto, req.user.id);
    const basket = await this.basketService.update(req.user.id);
    return basket && createdReservation;

  }

  @Get()
  @UseGuards(AuthGuard('bearer'))
  findAll( @Request() req) {
    return this.reservationService.findAll(req.user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.reservationService.findOne(+id);
    } catch {
      throw new BadRequestException('A keresett ID nem található')
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard('bearer'))
  async update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto, @Request() req) {
    const user: User = req.user
    try {
      if (user.role != 'Admin') {
        throw new ForbiddenException();
      }
      else {
        return await this.reservationService.update(+id, updateReservationDto);
      }
    } catch {
      throw new BadRequestException('A keresett ID nem található')
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.reservationService.remove(+id);
    } catch {
      throw new BadRequestException('A keresett ID nem található')
    }
  }
}
