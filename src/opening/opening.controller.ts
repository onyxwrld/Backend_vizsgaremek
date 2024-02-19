import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OpeningService } from './opening.service';
import { CreateOpeningDto } from './dto/create-opening.dto';
import { UpdateOpeningDto } from './dto/update-opening.dto';

@Controller('opening')
export class OpeningController {
  constructor(private readonly openingService: OpeningService) {}

  @Post()
  create(@Body() createOpeningDto: CreateOpeningDto) {
    return this.openingService.create(createOpeningDto);
  }

  @Get()
  findAll() {
    return this.openingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.openingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOpeningDto: UpdateOpeningDto) {
    return this.openingService.update(+id, updateOpeningDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.openingService.remove(+id);
  }
}
