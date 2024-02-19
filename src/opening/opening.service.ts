import { Injectable } from '@nestjs/common';
import { CreateOpeningDto } from './dto/create-opening.dto';
import { UpdateOpeningDto } from './dto/update-opening.dto';

@Injectable()
export class OpeningService {
  create(createOpeningDto: CreateOpeningDto) {
    return 'This action adds a new opening';
  }

  findAll() {
    return `This action returns all opening`;
  }

  findOne(id: number) {
    return `This action returns a #${id} opening`;
  }

  update(id: number, updateOpeningDto: UpdateOpeningDto) {
    return `This action updates a #${id} opening`;
  }

  remove(id: number) {
    return `This action removes a #${id} opening`;
  }
}
