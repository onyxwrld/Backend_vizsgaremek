import { Controller, Get, Post, Body, Patch, Param, Request, Delete, UseGuards, BadRequestException } from '@nestjs/common';
import { BasketService } from './basket.service';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateMenuDto } from 'src/menu/dto/create-menu.dto';
import { Menu, User } from '@prisma/client';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) { }

  @Post()
  @UseGuards(AuthGuard('bearer'))
  @ApiOperation({ summary: 'Új kosár létrehozása' })
  @ApiBody({ type: CreateBasketDto, description: 'A kosár létrehozásához szükséges adatok' })
  @ApiResponse({ status: 201, description: 'Kosár sikeresen létrehozva' })
  @ApiBearerAuth()
  create(@Body() createBasketDto: CreateBasketDto, @Request() req) {
    const user = req.user.id;
    const menu = createBasketDto.menu;

    const menuPrice = createBasketDto.menuPrice;
    return this.basketService.create(menu, user);
  }

  @Get()
  @ApiOperation({ summary: 'Felhasználó összes kosarának lekérdezése' })
  @ApiResponse({ status: 200, description: 'Kosarak sikeresen lekérdezve' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  findAll(@Request() req) {

    const user = req.user.id

    return this.basketService.findAll(user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Egy specifikus kosár lekérdezése ID alapján' })
  @ApiParam({ name: 'id', description: 'A lekérdezni kívánt kosár azonosítója', type: String })
  @ApiResponse({ status: 200, description: 'Kosár sikeresen lekérdezve' })
  @ApiResponse({ status: 400, description: 'A keresett ID nem található' })
  async findOne(@Param('id') id: string) {
    try {
      return await this.basketService.findOne(+id)
    } catch {
      throw new BadRequestException('A keresett ID nem található')
    }

  }
  @Patch(':id/removeitems')
  @ApiOperation({ summary: 'Elemek frissítése a kosárban' })
  @ApiParam({ name: 'id', description: 'A frissítendő kosár azonosítója', type: String })
  @ApiBody({ type: UpdateBasketDto, description: 'Frissítendő elemek a kosárban' })
  @ApiResponse({ status: 200, description: 'Elemek sikeresen frissítve a kosárban' })
  updateitems(@Param('id') id: string, @Body() updateBasketDto: UpdateBasketDto) {
    const menu = updateBasketDto.menu
    return this.basketService.updateitems(+id, menu)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Kosár törlése ID alapján' })
  @ApiParam({ name: 'id', description: 'A törlendő kosár azonosítója', type: String })
  @ApiResponse({ status: 200, description: 'Kosár sikeresen törölve' })
  @ApiResponse({ status: 400, description: 'A keresett ID nem található' })
  async remove(@Param('id') id: string) {
    try {
      return this.basketService.remove(+id);
    } catch {
      throw new BadRequestException('A keresett ID nem található')
    }

  }
}
