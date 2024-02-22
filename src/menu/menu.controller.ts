import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  findAll() {
    return this.menuService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {return await this.menuService.findOne(+id);
    }catch{
      throw new BadRequestException('A keresett ID nem található')
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    try{ return await this.menuService.update(+id, updateMenuDto);
    }catch{
      throw new BadRequestException('A keresett ID nem található')
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {return await this.menuService.remove(+id);
    }catch{
      throw new BadRequestException('A keresett ID nem található')
    }
  }
}
