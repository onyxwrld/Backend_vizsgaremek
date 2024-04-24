import { Body, Controller, Get, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/Login.dto';
import { Prisma } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { verify } from 'argon2';
import { PassportModule } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UserService,
    private readonly authService: AuthService) { }
  @Post('login')
  @ApiOperation({ summary: 'Felhasználó bejelentkezése' })
  @ApiBody({ type: LoginDto, description: 'Bejelentkezéshez szükséges adatok: felhasználónév és jelszó' })
  @ApiResponse({ status: 200, description: 'Sikeres bejelentkezés, token és felhasználói szerepkör visszaadása.' })
  @ApiResponse({ status: 401, description: 'Hibás email vagy jelszó!' })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.usersService.findByUsername(loginDto.username);
    const userId = user.id
    const userInfo = await this.usersService.findOne(userId)
    const role = userInfo.role

    if (user == null) {
      throw new UnauthorizedException('Hibás email vagy jelszó!')
    }
    if (!await verify(user.password, loginDto.password)) {
      throw new UnauthorizedException('Hibás email vagy jelszó!')
    }
    if (user.role != 'Admin') {
    }

    return {
      token: await this.authService.generateTokenFor(user),
      role: await role

    }
  }
}
