import { Injectable } from '@nestjs/common';
import { CreateBicycleDto } from './dto/create-bicycle.dto';
import { UpdateBicycleDto } from './dto/update-bicycle.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BicycleService {
  constructor (private readonly db: PrismaService){

  }
  create(createBicycleDto: CreateBicycleDto) {
    return 'This action adds a new bicycle';
  }

  findAll() {
    return this.db.bicycle.findMany();
  }

  findOne(id: number) {
    return this.db.bicycle.findUniqueOrThrow(
      {
        where: {id}
      }
    );
  }

  update(id: number, updateBicycleDto: UpdateBicycleDto) {
    return this.db.bicycle.update(
      {
        data: updateBicycleDto,
        where: {id}
      }
    );
  }

  remove(id: number) {
    return this.db.bicycle.delete({
      where: {id}
    });
  }
}
