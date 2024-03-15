import { Controller, Get, Post, Body, Patch, Param, Request, Delete, UseGuards } from '@nestjs/common';
import { BasketService } from './basket.service';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateMenuDto } from 'src/menu/dto/create-menu.dto';

@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Post()
  @UseGuards(AuthGuard('bearer'))
  create(@Body() createBasketDto: CreateBasketDto,@Request() req,createMenuDto: CreateMenuDto,)
  
  {
    const menu = Menu
    return this.basketService.create(createBasketDto, req.user.id,createMenuDto.);
  }

  @Get()
  findAll() {
    return this.basketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.basketService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBasketDto: UpdateBasketDto) {
    return this.basketService.update(+id, updateBasketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.basketService.remove(+id);
  }
}
