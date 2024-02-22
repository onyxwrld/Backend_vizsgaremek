import { Controller, Get, Post, Body, Patch, Param, Delete,BadRequestException } from '@nestjs/common';
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
  async findOne(@Param('id') id: string) {
    try { return await this.openingService.findOne(+id);
    }catch{
      throw new BadRequestException('Az IP cím nem található')
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateOpeningDto: UpdateOpeningDto) {
    try {return await this.openingService.update(+id, updateOpeningDto);
    }catch{
      throw new BadRequestException('Az IP cím nem található')
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {return await this.openingService.remove(+id);
    }catch{
      throw new BadRequestException('Az IP cím nem található')
    }
  }
}
