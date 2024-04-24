import { Controller, Get, Post, Body, Patch, Param, Delete, Request, BadRequestException, UseGuards, ForbiddenException } from '@nestjs/common';
import { TorzsAdatokService } from './torzs-adatok.service';
import { CreateTorzsAdatokDto } from './dto/create-torzs-adatok.dto';
import { UpdateTorzsAdatokDto } from './dto/update-torzs-adatok.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ApiBearerAuth, ApiBody, ApiForbiddenResponse, ApiOperation, ApiParam, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('torzs-adatok')
export class TorzsAdatokController {
  constructor(private readonly torzsAdatokService: TorzsAdatokService) { }

  @Post()
  @UseGuards(AuthGuard('bearer'))
  @ApiOperation({ summary: 'Új törzadat létrehozása' })
  @ApiBody({ type: CreateTorzsAdatokDto, description: 'A létrehozandó törzadatok' })
  @ApiResponse({ status: 201, description: 'Törzadat sikeresen létrehozva.' })
  @ApiUnauthorizedResponse({ description: 'Hitelesítés szükséges.' })
  @ApiForbiddenResponse({ description: 'Csak adminisztrátorok végezhetik ezt a műveletet.' })
  @ApiBearerAuth()
  create(@Body() createTorzsAdatokDto: CreateTorzsAdatokDto, @Request() req) {
    const user: User = req.user;
    if (user.role != 'Admin') {
      throw new ForbiddenException();
    }
    else {
      return this.torzsAdatokService.create(createTorzsAdatokDto);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Összes törzadat lekérdezése' })
  @ApiResponse({ status: 200, description: 'Sikeres lekérdezés, itt vannak az összes törzadat adatai.' })
  findAll() {
    return this.torzsAdatokService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Egy specifikus törzadat lekérdezése ID alapján' })
  @ApiParam({ name: 'id', description: 'A lekérdezni kívánt törzadat azonosítója', type: String })
  @ApiResponse({ status: 200, description: 'A törzadat sikeresen lekérdezve.' })
  @ApiResponse({ status: 400, description: 'A keresett ID nem található' })
  async findOne(@Param('id') id: string) {
    try {
      return await this.torzsAdatokService.findOne(+id);
    } catch {
      throw new BadRequestException('A keresett ID nem található')
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Törzadat frissítése ID alapján' })
  @ApiParam({ name: 'id', description: 'A frissítendő törzadat azonosítója', type: String })
  @ApiBody({ type: UpdateTorzsAdatokDto, description: 'A frissítéshez szükséges adatok' })
  @ApiResponse({ status: 200, description: 'A törzadat sikeresen frissítve.' })
  @ApiResponse({ status: 400, description: 'A keresett ID nem található' })
  async update(@Param('id') id: string, @Body() updateTorzsAdatokDto: UpdateTorzsAdatokDto) {
    try {
      return await this.torzsAdatokService.update(+id, updateTorzsAdatokDto);
    } catch {
      throw new BadRequestException('A keresett ID nem található')
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Törzadat törlése ID alapján' })
  @ApiParam({ name: 'id', description: 'A törzendő törzadat azonosítója', type: String })
  @ApiResponse({ status: 200, description: 'A törzadat sikeresen törölve.' })
  @ApiResponse({ status: 400, description: 'A keresett ID nem található' })
  async remove(@Param('id') id: string) {
    try {
      return await this.torzsAdatokService.remove(+id);
    } catch {
      throw new BadRequestException('A keresett ID nem található')
    }
  }
}
