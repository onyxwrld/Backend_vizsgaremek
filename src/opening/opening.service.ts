import { Injectable } from '@nestjs/common';
import { CreateOpeningDto } from './dto/create-opening.dto';
import { UpdateOpeningDto } from './dto/update-opening.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OpeningService {
  constructor (private readonly db:PrismaService){

  }
  create(createOpeningDto: CreateOpeningDto) {
    return 'This action adds a new opening';
  }

  findAll() {
    return this.db.opening.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} opening`;
  }

  update(id: number, updateOpeningDto: UpdateOpeningDto) {
    return this.db.opening.update({
      data: updateOpeningDto,
      where: {id}
    });
  }

  remove(id: number) {
    return `This action removes a #${id} opening`;
  }
}
