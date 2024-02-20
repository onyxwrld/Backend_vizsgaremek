import { Injectable } from '@nestjs/common';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class WorkerService {
  constructor (private readonly db:PrismaService){

  }
  create(createWorkerDto: CreateWorkerDto) {
    return this.db.worker.create({
      data: createWorkerDto
    });
  }

  findAll() {
    return this.db.worker.findMany();
  }

  findOne(id: number) {
    return this.db.worker.findUniqueOrThrow({
      where: {id}
    });
  }

  update(id: number, updateWorkerDto: UpdateWorkerDto) {
    return this.db.worker.update({
      data: updateWorkerDto,
      where: {id}
    });
  }

  remove(id: number) {
    return `This action removes a #${id} worker`;
  }
}
