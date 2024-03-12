import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class ReviewService {
  constructor(private readonly db: PrismaService) {

  }
  create(createReviewDto: CreateReviewDto, userId: number) {
    return this.db.review.create({

      data: {
        rate: createReviewDto.rate,
        content: createReviewDto.content,
        user: {
          connect: {
            id: userId
          }
        }
      }
    });
  }

  findAll() {
    return this.db.review.findMany();
  }

  findOneId(id:number){
    return this.db.review.findUniqueOrThrow({
      where:{id}
    })
  }

  findOne(id: number) {
    return this.db.review.findUniqueOrThrow({
      where: { id },
      include: {
        user: {
          select: {
            username: true
          }
        }
      }
    });
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return this.db.review.delete({
      where:{id}
    });
  }
  findReviewByUserId(userId:string){
    return this.db.review.findMany({
      where: {
        user: {
          id: parseInt(userId)
        }
      }
    })
  }
}
