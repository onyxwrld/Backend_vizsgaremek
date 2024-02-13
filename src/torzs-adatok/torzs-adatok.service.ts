import { Injectable } from '@nestjs/common';
import { CreateTorzsAdatokDto } from './dto/create-torzs-adatok.dto';
import { UpdateTorzsAdatokDto } from './dto/update-torzs-adatok.dto';

@Injectable()
export class TorzsAdatokService {
  create(createTorzsAdatokDto: CreateTorzsAdatokDto) {
    return 'This action adds a new torzsAdatok';
  }

  findAll() {
    return `This action returns all torzsAdatok`;
  }

  findOne(id: number) {
    return `This action returns a #${id} torzsAdatok`;
  }

  update(id: number, updateTorzsAdatokDto: UpdateTorzsAdatokDto) {
    return `This action updates a #${id} torzsAdatok`;
  }

  remove(id: number) {
    return `This action removes a #${id} torzsAdatok`;
  }
}
