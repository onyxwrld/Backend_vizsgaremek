import { Injectable } from '@nestjs/common';
import { CreateBicycleDto } from './dto/create-bicycle.dto';
import { UpdateBicycleDto } from './dto/update-bicycle.dto';

@Injectable()
export class BicycleService {
  create(createBicycleDto: CreateBicycleDto) {
    return 'This action adds a new bicycle';
  }

  findAll() {
    return `This action returns all bicycle`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bicycle`;
  }

  update(id: number, updateBicycleDto: UpdateBicycleDto) {
    return `This action updates a #${id} bicycle`;
  }

  remove(id: number) {
    return `This action removes a #${id} bicycle`;
  }
}
