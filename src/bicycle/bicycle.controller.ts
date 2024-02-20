import { Controller, Get, Post, Body, Patch, Param, Delete,BadRequestException } from '@nestjs/common';
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
  async findOne(@Param('id') id: string) {
    try {return await this.bicycleService.findOne(+id);
    }
    catch{
      throw new BadRequestException('A keresett ID nem található')
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBicycleDto: UpdateBicycleDto) {
    try {return await this.bicycleService.update(+id, updateBicycleDto);
    }catch{
      throw new BadRequestException('A keresett ID nem található')
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
   try{ return await this.bicycleService.remove(+id);
   }catch{
    throw new BadRequestException('A keresett ID nem található.')
   }

  }
}
