import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, BadRequestException, ConflictException, ValidationPipe, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { ChangePassDto } from './dto/changepass.dto';
import { verify } from 'argon2';
import { AuthService } from 'src/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LoginDto } from 'src/auth/dto/Login.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
    ) { }
  @Get('me')
  @UseGuards(AuthGuard('bearer'))
  me(@Request() req) {
    const user: User = req.user;

    return {
      username: user.username,
      email: user.email,
      lastName: user.last_name,
      firstName: user.first_name,
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
  
  @Patch(':id/changepass')
  @UseGuards(AuthGuard('bearer'))
  async updatePass(@Param('id') id:string, @Body() changePassDto: ChangePassDto,@Request() req){
    const user = await this.userService.findOne(parseInt(id))
    if(user.id!=parseInt(id)  ){
      throw new ForbiddenException()
    }
    if(changePassDto.oldpass == null){
      throw new ForbiddenException('Kérlek add meg a régi jelszavad!')
    }

    if(!await verify(user.password,changePassDto.oldpass)){
      throw new UnauthorizedException('Hibás régi jelszót adtál meg!')
    }

    if(await verify(user.password,changePassDto.newpass)){
      throw new UnauthorizedException('Nem adhatod meg ugyan azt a jelszót mint amit régen.')
    }


    return await this.userService.updatePass(+id,changePassDto) && await this.authService.ChangePassDeleteToken(parseInt(id))
    

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
