import { Controller, Get, Post, Body, Patch, Param, Delete, Request, BadRequestException, UseGuards, ForbiddenException } from '@nestjs/common';
import { BicycleService } from './bicycle.service';
import { CreateBicycleDto } from './dto/create-bicycle.dto';
import { UpdateBicycleDto } from './dto/update-bicycle.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('bicycle')
export class BicycleController {
  constructor(private readonly bicycleService: BicycleService) { }

  @Post()
  @UseGuards(AuthGuard('bearer'))
  @ApiOperation({ summary: 'Létrehoz egy új biciklit' })
  @ApiBody({ type: CreateBicycleDto, description: 'Az adat létrehozásához kell egy tipus (enum) és ár (number)' })
  @ApiResponse({ status: 201, description: 'Bicikli sikeresen létrehozva' })
  @ApiResponse({ status: 403, description: 'Forbidden: only Admins can create bicycles.' })
  @ApiBearerAuth()
  create(@Body() createBicycleDto: CreateBicycleDto, @Request() req) {
    const user: User = req.user;
    if (user.role != 'Admin') {
      throw new ForbiddenException();
    } else {
      return this.bicycleService.create(createBicycleDto);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Összes bicikli lekérdezése' })
  @ApiResponse({ status: 200, description: 'Sikeresen lekérdezve az összes bicikli.' })
  findAll() {
    return this.bicycleService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Egy specifikus bicikli lekérdezése ID alapján' })
  @ApiParam({ name: 'id', description: 'A bicikli azonosítója', type: String })
  @ApiResponse({ status: 200, description: 'A bicikli sikeresen lekérdezve.' })
  @ApiResponse({ status: 400, description: 'A keresett ID nem található' })
  async findOne(@Param('id') id: string) {
    try {
      return await this.bicycleService.findOne(+id);
    }
    catch {
      throw new BadRequestException('A keresett ID nem található')
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard('bearer'))
  @ApiOperation({ summary: 'Bicikli frissítése ID alapján' })
  @ApiParam({ name: 'id', description: 'A frissítendő bicikli azonosítója', type: String })
  @ApiBody({ type: UpdateBicycleDto, description: 'Az új adatok a bicikli frissítéséhez' })
  @ApiResponse({ status: 200, description: 'A bicikli sikeresen frissítve.' })
  @ApiResponse({ status: 403, description: 'Hozzáférés megtagadva: csak adminisztrátorok frissíthetnek.' })
  @ApiResponse({ status: 400, description: 'A keresett ID nem található' })
  @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() updateBicycleDto: UpdateBicycleDto, @Request() req) {
    const user: User = req.user;
    try {
      if (user.role != 'Admin') {
        throw new ForbiddenException();
      } else {
        return await this.bicycleService.update(+id, updateBicycleDto);
      }
    } catch {
      throw new BadRequestException('A keresett ID nem található')
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Bicikli törlése ID alapján' })
  @ApiParam({ name: 'id', description: 'A törlendő bicikli azonosítója', type: String })
  @ApiResponse({ status: 200, description: 'A bicikli sikeresen törölve.' })
  @ApiResponse({ status: 400, description: 'A keresett ID nem található' })
  async remove(@Param('id') id: string) {
    try {
      return await this.bicycleService.remove(+id);
    } catch {
      throw new BadRequestException('A keresett ID nem található.')
    }

  }
}
