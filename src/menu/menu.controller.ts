import { Controller, Get, Post, Body, Patch, Param, Delete, Request, BadRequestException, UseGuards, ForbiddenException } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) { }

  @Post()
  @UseGuards(AuthGuard('bearer'))
  @ApiOperation({ summary: 'Új menü létrehozása' })
  @ApiBody({ type: CreateMenuDto, description: 'Az új menü létrehozásához szükséges adatok' })
  @ApiResponse({ status: 201, description: 'Menü sikeresen létrehozva' })
  @ApiResponse({ status: 403, description: 'Csak admin jogosultságú felhasználók hozhatnak létre menüt' })
  @ApiBearerAuth()
  create(@Body() createMenuDto: CreateMenuDto, @Request() req) {
    const user: User = req.user;
    if (user.role != 'Admin') {
      throw new ForbiddenException();
    } else {
      return this.menuService.create(createMenuDto);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Összes menü lekérdezése' })
  @ApiResponse({ status: 200, description: 'Az összes menü sikeresen lekérdezve' })
  findAll() {
    return this.menuService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Egy specifikus menü lekérdezése ID alapján' })
  @ApiParam({ name: 'id', description: 'A lekérdezni kívánt menü azonosítója', type: String })
  @ApiResponse({ status: 200, description: 'Menü sikeresen lekérdezve' })
  @ApiResponse({ status: 400, description: 'A keresett ID nem található' })
  async findOne(@Param('id') id: string) {
    try {
      return await this.menuService.findOne(+id);
    } catch {
      throw new BadRequestException('A keresett ID nem található')
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard('bearer'))
  @ApiOperation({ summary: 'Menü frissítése ID alapján' })
  @ApiParam({ name: 'id', description: 'A frissítendő menü azonosítója', type: String })
  @ApiBody({ type: UpdateMenuDto, description: 'A menü frissítéséhez szükséges adatok' })
  @ApiResponse({ status: 200, description: 'Menü sikeresen frissítve' })
  @ApiResponse({ status: 403, description: 'Csak admin jogosultságú felhasználók frissíthetik a menüt' })
  @ApiResponse({ status: 400, description: 'A keresett ID nem található' })
  @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto, @Request() req) {
    const user: User = req.user;
    if (user.role != 'Admin') {
      throw new ForbiddenException();
    }
    try {
      return await this.menuService.update(+id, updateMenuDto);
    }
    catch {
      throw new BadRequestException('A keresett ID nem található')
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Menü törlése ID alapján' })
  @ApiParam({ name: 'id', description: 'A törlendő menü azonosítója', type: String })
  @ApiResponse({ status: 200, description: 'Menü sikeresen törölve' })
  @ApiResponse({ status: 400, description: 'A keresett ID nem található' })
  async remove(@Param('id') id: string) {
    try {
      return await this.menuService.remove(+id);
    } catch {
      throw new BadRequestException('A keresett ID nem található')
    }
  }
}
