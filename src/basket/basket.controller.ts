import { Controller, Get, Post, Body, Patch, Param, Request, Delete, UseGuards, BadRequestException } from '@nestjs/common';
import { BasketService } from './basket.service';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateMenuDto } from 'src/menu/dto/create-menu.dto';
import { Menu, User } from '@prisma/client';

@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Post()
  @UseGuards(AuthGuard('bearer'))
  create(@Body() createBasketDto: CreateBasketDto, @Request() req)
  {
    const user = req.user.id;
    const menu = createBasketDto.menu;

    const menuPrice = createBasketDto.menuPrice;
    return this.basketService.create(menuPrice,menu, user);
  }

  @Get()
  findAll() {
    return this.basketService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try{
      return await this.basketService.findOne(+id)
    }catch{
      throw new BadRequestException('A keresett ID nem található')
    }
    
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBasketDto: UpdateBasketDto) {
    return this.basketService.update(+id, updateBasketDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try{ 
      return this.basketService.remove(+id);
    }catch{
      throw new BadRequestException('A keresett ID nem található')
    }
   
  }
}
