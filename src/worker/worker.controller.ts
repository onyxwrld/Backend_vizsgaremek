import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';

@Controller('worker')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @Post()
  create(@Body() createWorkerDto: CreateWorkerDto) {
    return this.workerService.create(createWorkerDto);
  }

  @Get()
  findAll() {
    return this.workerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {return this.workerService.findOne(+id);
    }catch{
      throw new BadRequestException('A keresett ID nem található')
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateWorkerDto: UpdateWorkerDto) {
    try {return this.workerService.update(+id, updateWorkerDto);
    }catch{
      throw new BadRequestException('A keresett ID nem található')
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {return this.workerService.remove(+id);
    }catch{
      throw new BadRequestException('A keresett ID nem található')
    }
  }
}
