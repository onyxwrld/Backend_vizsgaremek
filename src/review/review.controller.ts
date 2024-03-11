import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Request, UnauthorizedException } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { AuthGuard } from '@nestjs/passport';
import { Review, User } from '@prisma/client';
import { ESLint } from 'eslint';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @UseGuards(AuthGuard('bearer'))
  create(@Body() createReviewDto: CreateReviewDto,@Request() req) {
    return this.reviewService.create(createReviewDto);
  }

  @Get()
  findAll() {
    return this.reviewService.findAll();
  }

  
  @Get(':id')
  @UseGuards(AuthGuard('bearer'))
  findOne(@Param('id') id: string,@Request() req) {
    const user:User=req.user;
    return this.reviewService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('bearer'))
  remove(@Param('id') id: string,@Request() req) {
    const user:User= req.user;
    const review:Review= req.review;
    if(user.id != review.userId){
      throw new UnauthorizedException("Törlés jelentkezzen be!");
    }
    else{
      return this.reviewService.remove(+id);
    }
  }
}
