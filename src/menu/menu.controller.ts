import { Controller, Get, Post, Body, Patch, Param, Delete, Request, BadRequestException, UseGuards, ForbiddenException } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) { }

  @Post()
  @UseGuards(AuthGuard('bearer'))
  create(@Body() createMenuDto: CreateMenuDto, @Request() req) {
    const user: User = req.user;
    if (user.role != 'Admin') {
      throw new ForbiddenException();
    } else {
      return this.menuService.create(createMenuDto);
    }
  }

  @Get()
  findAll() {
    return this.menuService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.menuService.findOne(+id);
    } catch {
      throw new BadRequestException('A keresett ID nem található')
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard('bearer'))
  async update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto, @Request() req) {
    const user: User = req.user;
    try {
      if (user.role != 'Admin') {
        throw new ForbiddenException();
      } else {
        return await this.menuService.update(+id, updateMenuDto);
      }
    } catch {
      throw new BadRequestException('A keresett ID nem található')
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.menuService.remove(+id);
    } catch {
      throw new BadRequestException('A keresett ID nem található')
    }
  }
}
