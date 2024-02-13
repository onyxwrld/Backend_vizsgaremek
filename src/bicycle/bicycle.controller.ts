import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BicycleService } from './bicycle.service';
import { CreateBicycleDto } from './dto/create-bicycle.dto';
import { UpdateBicycleDto } from './dto/update-bicycle.dto';

@Controller('bicycle')
export class BicycleController {
  constructor(private readonly bicycleService: BicycleService) {}

  @Post()
  create(@Body() createBicycleDto: CreateBicycleDto) {
    return this.bicycleService.create(createBicycleDto);
  }

  @Get()
  findAll() {
    return this.bicycleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bicycleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBicycleDto: UpdateBicycleDto) {
    return this.bicycleService.update(+id, updateBicycleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bicycleService.remove(+id);
  }
}
