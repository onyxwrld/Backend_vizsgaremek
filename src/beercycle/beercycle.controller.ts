import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BeercycleService } from './beercycle.service';
import { CreateBeercycleDto } from './dto/create-beercycle.dto';
import { UpdateBeercycleDto } from './dto/update-beercycle.dto';

@Controller('beercycle')
export class BeercycleController {
  constructor(private readonly beercycleService: BeercycleService) {}

  @Post()
  create(@Body() createBeercycleDto: CreateBeercycleDto) {
    return this.beercycleService.create(createBeercycleDto);
  }

  @Get()
  findAll() {
    return this.beercycleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.beercycleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBeercycleDto: UpdateBeercycleDto) {
    return this.beercycleService.update(+id, updateBeercycleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.beercycleService.remove(+id);
  }
}
