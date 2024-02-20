import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MenuService {
  constructor (private readonly db: PrismaService){

  }
  create(createMenuDto: CreateMenuDto) {
    return this.db.menu.create(
      {
        data: createMenuDto
      }
    );
  }

  findAll() {
    return this.db.menu.findMany();
  }

  findOne(id: number) {
    return this.db.menu.findUniqueOrThrow({
      where: {id}
    });
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return this.db.menu.update({
      data: updateMenuDto,
      where: {id}
    });
  }

  remove(id: number) {
    return this.db.menu.delete({
      where: {id}
    });
  }
}
