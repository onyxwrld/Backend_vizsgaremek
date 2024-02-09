import { Injectable } from '@nestjs/common';
import { CreateBeercycleDto } from './dto/create-beercycle.dto';
import { UpdateBeercycleDto } from './dto/update-beercycle.dto';

@Injectable()
export class BeercycleService {
  create(createBeercycleDto: CreateBeercycleDto) {
    return 'This action adds a new beercycle';
  }

  findAll() {
    return `This action returns all beercycle`;
  }

  findOne(id: number) {
    return `This action returns a #${id} beercycle`;
  }

  update(id: number, updateBeercycleDto: UpdateBeercycleDto) {
    return `This action updates a #${id} beercycle`;
  }

  remove(id: number) {
    return `This action removes a #${id} beercycle`;
  }
}
