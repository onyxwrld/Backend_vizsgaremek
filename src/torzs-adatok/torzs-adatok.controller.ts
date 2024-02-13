import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
  findOne(@Param('id') id: string) {
    return this.torzsAdatokService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTorzsAdatokDto: UpdateTorzsAdatokDto) {
    return this.torzsAdatokService.update(+id, updateTorzsAdatokDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.torzsAdatokService.remove(+id);
  }
}
