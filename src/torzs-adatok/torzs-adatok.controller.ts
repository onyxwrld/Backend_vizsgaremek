import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { TorzsAdatokService } from './torzs-adatok.service';
import { CreateTorzsAdatokDto } from './dto/create-torzs-adatok.dto';
import { UpdateTorzsAdatokDto } from './dto/update-torzs-adatok.dto';

@Controller('torzs-adatok')
export class TorzsAdatokController {
  constructor(private readonly torzsAdatokService: TorzsAdatokService) {}

  @Post()
  create(@Body() createTorzsAdatokDto: CreateTorzsAdatokDto) {
    return this.torzsAdatokService.create(createTorzsAdatokDto);
  }

  @Get()
  findAll() {
    return this.torzsAdatokService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {return await this.torzsAdatokService.findOne(+id);
    }catch{
      throw new BadRequestException('A keresett ID nem található')
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTorzsAdatokDto: UpdateTorzsAdatokDto) {
    try {return await this.torzsAdatokService.update(+id, updateTorzsAdatokDto);
    }catch{
      throw new BadRequestException('A keresett ID nem található')
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {return await this.torzsAdatokService.remove(+id);
    }catch{
      throw new BadRequestException('A keresett ID nem található')
    }
  }
}
