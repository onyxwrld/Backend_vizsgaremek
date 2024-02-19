import { Injectable } from '@nestjs/common';
import { CreateTorzsAdatokDto } from './dto/create-torzs-adatok.dto';
import { UpdateTorzsAdatokDto } from './dto/update-torzs-adatok.dto';
import { PrismaService } from 'src/prisma.service';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class TorzsAdatokService {
  constructor (private readonly db: PrismaService){

  }
  create(createTorzsAdatokDto: CreateTorzsAdatokDto) {
    return 'This action adds a new torzsAdatok';
  }

  findAll() {
    return this.db.torzsAdatok.findMany({
      include: {
        opening: true,
        worker: true
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} torzsAdatok`;
  }

  update(id: number, updateTorzsAdatokDto: UpdateTorzsAdatokDto) {
    return this.db.torzsAdatok.findFirstOrThrow({
      where: {id}
    })
  }

  remove(id: number) {
    return `This action removes a #${id} torzsAdatok`;
  }
}
