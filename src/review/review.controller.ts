import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UnauthorizedException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { AuthGuard } from '@nestjs/passport';
import { Review, User } from '@prisma/client';
import { ESLint } from 'eslint';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiNotFoundResponse, ApiOperation, ApiParam, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService
  ) { }

  @Post()
  @UseGuards(AuthGuard('bearer'))
  @ApiOperation({ summary: 'Új értékelés létrehozása' })
  @ApiBody({ type: CreateReviewDto, description: 'Az új értékelés létrehozásához szükséges adatok' })
  @ApiResponse({ status: 201, description: 'Értékelés sikeresen létrehozva' })
  @ApiBearerAuth()
  create(@Body() createReviewDto: CreateReviewDto, @Request() req) {
    return this.reviewService.create(createReviewDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Összes értékelés lekérdezése' })
  @ApiResponse({ status: 200, description: 'Az összes értékelés sikeresen lekérdezve' })
  findAll() {
    return this.reviewService.findAll();
  }

  @Get('userid/:id')
  @UseGuards(AuthGuard('bearer'))
  @ApiOperation({ summary: 'Értékelések lekérdezése felhasználói ID alapján' })
  @ApiParam({ name: 'id', description: 'A felhasználó azonosítója, akinek az értékeléseit lekérdezzük', type: String })
  @ApiResponse({ status: 200, description: 'Értékelések sikeresen lekérdezve' })
  @ApiResponse({ status: 403, description: 'Hozzáférés megtagadva' })
  @ApiBearerAuth()
  findReviewByUserId(@Param('id') id: string, @Request() req) {
    if (req.user.id != id) {
      throw new UnauthorizedException();
    }
    else {
      return this.reviewService.findReviewByUserId(id);
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard('bearer'))
  @ApiOperation({ summary: 'Egy konkrét értékelés lekérdezése' })
  @ApiParam({ name: 'id', description: 'Az értékelés azonosítója', type: String })
  @ApiResponse({ status: 200, description: 'Az értékelés sikeresen lekérdezve' })
  @ApiBearerAuth()
  findOne(@Param('id') id: string, @Request() req) {
    const user: User = req.user;
    return this.reviewService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Értékelés frissítése' })
  @ApiParam({ name: 'id', description: 'A frissítendő értékelés azonosítója', type: String })
  @ApiBody({ type: UpdateReviewDto, description: 'A frissítéshez szükséges adatok' })
  @ApiResponse({ status: 200, description: 'Az értékelés sikeresen frissítve' })
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(+id, updateReviewDto);
  }

  @Delete('AdminRevDelete/:id')
  @UseGuards(AuthGuard('bearer'))
  @ApiOperation({ summary: 'Admin általi értékelés törlése ID alapján' })
  @ApiParam({ name: 'id', description: 'A törlendő értékelés azonosítója', type: String })
  @ApiResponse({ status: 200, description: 'Az értékelés sikeresen törölve.' })
  @ApiUnauthorizedResponse({ description: 'Nincs jogosultsága a művelet végrehajtásához.' })
  @ApiBadRequestResponse({ description: 'A keresett ID nem található vagy a törlés nem sikerült.' })
  @ApiBearerAuth()
  async remove1(@Param('id') id: string, @Request() req) {
    try {
      if (req.user.role !== 'Admin') {
        throw new UnauthorizedException('Nincs jogosultsága a művelet végrehajtásához.');
      }
      return await this.reviewService.remove(+id);
    } catch (e) {
      throw new BadRequestException('A keresett ID nem található vagy a törlés nem sikerült.');
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('bearer'))
  @ApiOperation({ summary: 'Értékelés törlése' })
  @ApiParam({ name: 'id', description: 'A törlendő értékelés azonosítója', type: String })
  @ApiResponse({ status: 200, description: 'Értékelés sikeresen törölve.' })
  @ApiUnauthorizedResponse({ description: 'Hitelesítés szükséges.' })
  @ApiNotFoundResponse({ description: 'Az adott azonosítóval nem található értékelés.' })
  @ApiBearerAuth()
  async remove(@Param('id') id: string, @Request() req) {
    const user: User = req.user;
    const review = await this.reviewService.findOneId(parseInt(id))


    if (user.id != review.userId) {
      throw new UnauthorizedException("Törléshez jelentkezzen be!");
    }
    else {
      return this.reviewService.remove(+id);
    }
  }
}
