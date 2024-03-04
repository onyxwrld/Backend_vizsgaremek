import { Body, Controller, Get, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/Login.dto';
import { Prisma } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { verify } from 'argon2';
import { PassportModule } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UserService,
    private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() loginDto: LoginDto){
    const user = await this.usersService.findByUsername(loginDto.username);
    if(user == null){
      throw new UnauthorizedException('Hibás email vagy jelszó!')
    }
    if(!await verify(user.password,loginDto.password)){
      throw new UnauthorizedException('Hibás email vagy jelszó!')
    }

    return {
      token: await this.authService.generateTokenFor(user)
    }
  }
}
