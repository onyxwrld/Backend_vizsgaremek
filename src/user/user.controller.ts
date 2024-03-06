import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, BadRequestException, ConflictException, ValidationPipe, ForbiddenException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Get('me')
  @UseGuards(AuthGuard('bearer'))
  me(@Request() req) {
    const user: User = req.user;

    return {
      username: user.username
    }
  }
  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {

    const user = await this.userService.findByUsername(createUserDto.username)
    const email = await this.userService.findByUserEmail(createUserDto.email)
    if (email) {
      throw new ConflictException("Email already exist!")
    }
    if (user) {
      throw new ConflictException("Username already exist!")
    }

    return this.userService.createUser(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.userService.findOne(+id);
    } catch {
      throw new BadRequestException('A keresett ID nem található')
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard('bearer'))
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Request() req) {
    const user: User = req.user

    if ( user.id != parseInt(id) ) {
    throw new ForbiddenException();
    }

  
    try {
        return await this.userService.update(+id, updateUserDto);
    } catch (error) {
      throw new BadRequestException('A keresett ID nem található')
    }
  }
  @Patch(':id/role')
  @UseGuards(AuthGuard('bearer'))
  async updateRole(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto,@Request() req) {
    const user: User = req.user
    if(user.role != 'Admin'){
      throw new ForbiddenException()
    }
    try{
      return await this.userService.updateRole(+id, updateUserDto);}
     catch {
      throw new BadRequestException('A keresett ID nem található')
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.userService.remove(+id);
    } catch {
      throw new BadRequestException('A keresett ID nem található')
    }
  }
}
