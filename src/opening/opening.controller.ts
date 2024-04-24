import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { OpeningService } from './opening.service';
import { CreateOpeningDto } from './dto/create-opening.dto';
import { UpdateOpeningDto } from './dto/update-opening.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('opening')
export class OpeningController {
  constructor(private readonly openingService: OpeningService) { }

  @Post()
  @ApiOperation({ summary: 'Új nyitvatartás létrehozása' })
  @ApiBody({ type: CreateOpeningDto, description: 'A létrehozandó nyitvatartási adatok' })
  @ApiResponse({ status: 201, description: 'Nyitvatartás sikeresen létrehozva' })
  create(@Body() createOpeningDto: CreateOpeningDto) {
    return this.openingService.create(createOpeningDto);
  }

  @Get()
  @ApiOperation({ summary: 'Összes nyitvatartás lekérdezése' })
  @ApiResponse({ status: 200, description: 'Az összes nyitvatartás sikeresen lekérdezve' })
  findAll() {
    return this.openingService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Egy specifikus nyitvatartás lekérdezése ID alapján' })
  @ApiParam({ name: 'id', description: 'A lekérdezni kívánt nyitvatartás azonosítója', type: String })
  @ApiResponse({ status: 200, description: 'Nyitvatartás sikeresen lekérdezve' })
  @ApiResponse({ status: 400, description: 'A keresett ID nem található' })
  async findOne(@Param('id') id: string) {
    try {
      return await this.openingService.findOne(+id);
    } catch {
      throw new BadRequestException('A keresett ID nem található')
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Nyitvatartás frissítése ID alapján' })
  @ApiParam({ name: 'id', description: 'A frissítendő nyitvatartás azonosítója', type: String })
  @ApiBody({ type: UpdateOpeningDto, description: 'A frissítéshez szükséges adatok' })
  @ApiResponse({ status: 200, description: 'Nyitvatartás sikeresen frissítve' })
  @ApiResponse({ status: 400, description: 'A keresett ID nem található' })
  async update(@Param('id') id: string, @Body() updateOpeningDto: UpdateOpeningDto) {
    try {
      return await this.openingService.update(+id, updateOpeningDto);
    } catch {
      throw new BadRequestException('A keresett ID nem található')
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Nyitvatartás törlése ID alapján' })
  @ApiParam({ name: 'id', description: 'A törlendő nyitvatartás azonosítója', type: String })
  @ApiResponse({ status: 200, description: 'Nyitvatartás sikeresen törölve' })
  @ApiResponse({ status: 400, description: 'A keresett ID nem található' })
  async remove(@Param('id') id: string) {
    try {
      return await this.openingService.remove(+id);
    } catch {
      throw new BadRequestException('A keresett ID nem található')
    }
  }
}
