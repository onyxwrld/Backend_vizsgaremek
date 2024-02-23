import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards,BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('me')
  @UseGuards(AuthGuard('bearer'))
  me(@Request() req){
    const user: User = req.user;
    
    return{
      email: user.email  
    }
  }
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {return await this.userService.findOne(+id);
    }catch{
      throw new BadRequestException('A keresett ID nem található')
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {return await this.userService.update(+id, updateUserDto);
    }catch{
      throw new BadRequestException('A keresett ID nem található')
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {return await this.userService.remove(+id);
    }catch{
      throw new BadRequestException('A keresett ID nem található')
    }
  }
}
