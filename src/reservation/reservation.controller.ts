import { Controller, Get, Post, Body, Patch, Param, Delete, Request, BadRequestException, UseGuards, ForbiddenException } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { BasketService } from 'src/basket/basket.service';
import { find } from 'rxjs';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@Controller('reservation')
export class ReservationController {
  constructor(
    private readonly reservationService: ReservationService,
    private readonly basketService: BasketService) { }

  @Get('allRes')
  @ApiOperation({ summary: 'Összes foglalás lekérdezése' })
  @ApiResponse({ status: 200, description: 'Az összes foglalás sikeresen lekérdezve' })
  @ApiResponse({ status: 403, description: 'Nincs megfelelő jogosultság az összes foglalás lekérdezéséhez' })
  @ApiBearerAuth()
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
  @ApiOperation({ summary: 'Foglalás állapotának frissítése' })
  @ApiParam({ name: 'id', description: 'A frissítendő foglalás azonosítója', type: String })
  @ApiBody({ type: UpdateReservationDto, description: 'Az állapot frissítéséhez szükséges adatok' })
  @ApiResponse({ status: 200, description: 'Foglalás állapota sikeresen frissítve' })
  @ApiResponse({ status: 403, description: 'Csak adminok frissíthetik a foglalás állapotát' })
  @ApiBearerAuth()
  async updateState(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto, @Request() req) {
    const user: User = req.user;
    if (user.role !== 'Admin') {
      throw new ForbiddenException('Only admins can update reservation state.');
    }
    return await this.reservationService.updateState(+id, updateReservationDto);
  }
  @Patch('stateme/:id')
  @UseGuards(AuthGuard('bearer'))
  @ApiOperation({ summary: 'Foglalás állapotának frissítése felhasználó által' })
  @ApiParam({ name: 'id', description: 'A frissítendő foglalás azonosítója', type: String })
  @ApiResponse({ status: 200, description: 'Foglalás állapota sikeresen frissítve' })
  async updateUserCancel(@Param('id') id: string,) {
    const numberId = parseInt(id);
    return await this.reservationService.updateStateme(numberId);
  }
  @Post()
  @UseGuards(AuthGuard('bearer'))
  @ApiOperation({ summary: 'Új foglalás létrehozása' })
  @ApiBody({ type: CreateReservationDto, description: 'A foglalás létrehozásához szükséges adatok' })
  @ApiResponse({ status: 201, description: 'Foglalás sikeresen létrehozva' })
  @ApiBearerAuth()
  async create(@Body() createReservationDto: CreateReservationDto, @Request() req) {
    const createdReservation = await this.reservationService.create(createReservationDto, req.user.id);
    const basket = await this.basketService.update(req.user.id);
    return basket && createdReservation;
  }

  @Get()
  @ApiOperation({ summary: 'Felhasználó foglalásainak lekérdezése' })
  @ApiResponse({ status: 200, description: 'Foglalások sikeresen lekérdezve' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  findAll(@Request() req) {
    return this.reservationService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Egy specifikus foglalás lekérdezése' })
  @ApiParam({ name: 'id', description: 'A lekérdezni kívánt foglalás azonosítója', type: String })
  @ApiResponse({ status: 200, description: 'Foglalás sikeresen lekérdezve' })
  @ApiResponse({ status: 400, description: 'A keresett ID nem található' })
  async findOne(@Param('id') id: string) {
    try {
      return await this.reservationService.findOne(+id);
    } catch {
      throw new BadRequestException('A keresett ID nem található')
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard('bearer'))
  @ApiOperation({ summary: 'Foglalás frissítése' })
  @ApiParam({ name: 'id', description: 'A frissítendő foglalás azonosítója', type: String })
  @ApiBody({ type: UpdateReservationDto, description: 'A foglalás frissítéséhez szükséges adatok' })
  @ApiResponse({ status: 200, description: 'Foglalás sikeresen frissítve' })
  @ApiResponse({ status: 403, description: 'Csak adminok frissíthetik a foglalást' })
  @ApiResponse({ status: 400, description: 'A keresett ID nem található' })
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
  @ApiOperation({ summary: 'Foglalás törlése' })
  @ApiParam({ name: 'id', description: 'A törlendő foglalás azonosítója', type: String })
  @ApiResponse({ status: 200, description: 'Foglalás sikeresen törölve' })
  @ApiResponse({ status: 400, description: 'A keresett ID nem található' })
  async remove(@Param('id') id: string) {
    try {
      return await this.reservationService.remove(+id);
    } catch {
      throw new BadRequestException('A keresett ID nem található')
    }
  }

}
