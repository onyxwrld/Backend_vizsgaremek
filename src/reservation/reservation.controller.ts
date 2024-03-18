import { Controller, Get, Post, Body, Patch, Param, Delete, Request, BadRequestException, UseGuards, ForbiddenException } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) { }

  @Post()
  @UseGuards(AuthGuard('bearer'))
  create(@Body() createReservationDto: CreateReservationDto, @Request() req) {
    return this.reservationService.create(createReservationDto,req.user.id);
  }

  @Get()
  findAll() {
    return this.reservationService.findAll();
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
