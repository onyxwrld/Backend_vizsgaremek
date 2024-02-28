import { Controller, Get, Post, Body, Patch, Param, Delete, Request, BadRequestException, UseGuards, ForbiddenException } from '@nestjs/common';
import { BicycleService } from './bicycle.service';
import { CreateBicycleDto } from './dto/create-bicycle.dto';
import { UpdateBicycleDto } from './dto/update-bicycle.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';

@Controller('bicycle')
export class BicycleController {
  constructor(private readonly bicycleService: BicycleService) { }

  @Post()
  @UseGuards(AuthGuard('bearer'))
  create(@Body() createBicycleDto: CreateBicycleDto, @Request() req) {
    const user: User = req.user;
    if (user.role != 'Admin') {
      throw new ForbiddenException();
    } else {
      return this.bicycleService.create(createBicycleDto);
    }
  }

  @Get()
  findAll() {
    return this.bicycleService.findAll();
  }

  @Get(':id')
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
  async remove(@Param('id') id: string) {
    try {
      return await this.bicycleService.remove(+id);
    } catch {
      throw new BadRequestException('A keresett ID nem található.')
    }

  }
}
