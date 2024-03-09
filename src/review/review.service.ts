import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ReviewService {
  constructor (private readonly db:PrismaService){

  }
  create(createReviewDto: CreateReviewDto) {
    return this.db.review.create({
        data: createReviewDto
    });
  }

  findAll() {
    return this.db.review.findMany();
  }

  findOne(id: number) {
    return this.db.review.findUniqueOrThrow({
      where:{id}
    });
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
