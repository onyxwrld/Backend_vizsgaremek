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
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) { }
  @Get('me')
  @UseGuards(AuthGuard('bearer'))
  @ApiOperation({ summary: 'A user/me-re a felhasználó adatait adja vissza' })
  @ApiResponse({ status: 200, description: 'User adatok sikeresen vissza tértek' })
  @ApiBearerAuth()
  me(@Request() req) {
    const user: User = req.user;

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      last_name: user.last_name,
      first_name: user.first_name,
    }
  }
  @Post('register')
  @ApiOperation({ summary: 'Új felhasználó regisztrációja' })
  @ApiBody({ type: CreateUserDto, description: 'A regisztrációhoz szükséges adatok' })
  @ApiResponse({ status: 201, description: 'Felhasználó sikeresen létrehozva.' })
  @ApiResponse({ status: 409, description: 'A megadott e-mail cím vagy felhasználónév már létezik.' })
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
  @Post('createadmin')
  @UseGuards(AuthGuard('bearer'))
  @ApiOperation({ summary: 'Admin felhasználó létrehozása' })
  @ApiBody({ type: CreateUserDto, description: 'Admin felhasználó létrehozásához szükséges adatok' })
  @ApiResponse({ status: 201, description: 'Admin felhasználó sikeresen létrehozva.' })
  @ApiResponse({ status: 409, description: 'A megadott e-mail cím vagy felhasználónév már létezik.' })
  @ApiResponse({ status: 403, description: 'Csak admin hajthatja végre ezt a műveletet.' })
  @ApiBearerAuth()
  async createAdmin(@Body() createUserDto: CreateUserDto, @Request() req) {

    const role = req.user.role;
    const user = await this.userService.findByUsername(createUserDto.username)
    const email = await this.userService.findByUserEmail(createUserDto.email)
    if (email) {
      throw new ConflictException("Email already exist!")
    }
    if (user) {
      throw new ConflictException("Username already exist!")
    }
    if (role != 'Admin') {
      throw new ForbiddenException("Csak admin hajthatja végre ezt a műveletett.")
    }

    return this.userService.createAdmin(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Összes felhasználó lekérdezése' })
  @ApiResponse({ status: 200, description: 'Sikeres lekérdezés, itt vannak az összes felhasználó adatai.' })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Egy specifikus felhasználó lekérdezése ID alapján' })
  @ApiParam({ name: 'id', description: 'A felhasználó azonosítója', type: String })
  @ApiResponse({ status: 200, description: 'A felhasználó adatai sikeresen lekérdezve.' })
  @ApiResponse({ status: 400, description: 'A keresett ID nem található' })
  async findOne(@Param('id') id: string) {
    try {
      return await this.userService.findOne(+id);
    } catch {
      throw new BadRequestException('A keresett ID nem található')
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard('bearer'))
  @ApiOperation({ summary: 'Felhasználó frissítése ID alapján' })
  @ApiParam({ name: 'id', description: 'A frissítendő felhasználó azonosítója', type: String })
  @ApiBody({ type: UpdateUserDto, description: 'A felhasználó frissítéséhez szükséges adatok' })
  @ApiResponse({ status: 200, description: 'A felhasználó sikeresen frissítve.' })
  @ApiResponse({ status: 403, description: 'Hozzáférés megtagadva: a felhasználó csak saját adatait frissítheti.' })
  @ApiResponse({ status: 400, description: 'A keresett ID nem található' })
  @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Request() req) {
    const user: User = req.user
    if (user.id != parseInt(id)) {
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
  @ApiOperation({ summary: 'Felhasználó szerepkörének frissítése ID alapján' })
  @ApiParam({ name: 'id', description: 'A frissítendő felhasználó azonosítója', type: String })
  @ApiBody({ type: UpdateUserDto, description: 'A szerepkör frissítéséhez szükséges adatok' })
  @ApiResponse({ status: 200, description: 'A felhasználó szerepköre sikeresen frissítve.' })
  @ApiResponse({ status: 403, description: 'Hozzáférés megtagadva: csak adminisztrátorok végezhetnek szerepkör frissítést.' })
  @ApiResponse({ status: 400, description: 'A keresett ID nem található' })
  @ApiBearerAuth()
  async updateRole(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Request() req) {
    const user: User = req.user
    if (user.role != 'Admin') {
      throw new ForbiddenException()
    }
    try {
      return await this.userService.updateRole(+id, updateUserDto);
    }
    catch {
      throw new BadRequestException('A keresett ID nem található')
    }
  }

  @Patch(':id/changepass')
  @UseGuards(AuthGuard('bearer'))
  @ApiOperation({ summary: 'Felhasználó jelszavának frissítése ID alapján' })
  @ApiParam({ name: 'id', description: 'A felhasználó azonosítója, akinek a jelszavát frissíteni szeretnénk', type: String })
  @ApiBody({ type: ChangePassDto, description: 'A jelszó frissítéséhez szükséges adatok, beleértve a régi és az új jelszót' })
  @ApiResponse({ status: 200, description: 'A jelszó sikeresen frissítve.' })
  @ApiResponse({ status: 403, description: 'Hozzáférés megtagadva: a régi jelszó megadása kötelező, vagy a felhasználó csak saját jelszavát frissítheti.' })
  @ApiResponse({ status: 401, description: 'Hibás régi jelszót adtál meg, vagy ugyanazt a jelszót próbáltad megadni, mint a régi.' })
  @ApiResponse({ status: 400, description: 'A keresett ID nem található' })
  @ApiBearerAuth()
  async updatePass(@Param('id') id: string, @Body() changePassDto: ChangePassDto, @Request() req) {
    const user = await this.userService.findOne(parseInt(id))
    if (user.id != parseInt(id)) {
      throw new ForbiddenException()
    }
    if (changePassDto.oldpass == null) {
      throw new ForbiddenException('Kérlek add meg a régi jelszavad!')
    }

    if (!await verify(user.password, changePassDto.oldpass)) {
      throw new UnauthorizedException('Hibás régi jelszót adtál meg!')
    }

    if (await verify(user.password, changePassDto.newpass)) {
      throw new UnauthorizedException('Nem adhatod meg ugyan azt a jelszót mint amit régen.')
    }
    return await this.userService.updatePass(+id, changePassDto) && await this.authService.ChangePassDeleteToken(parseInt(id));
  }

  @Delete(':id')
  @UseGuards(AuthGuard('bearer'))
  @ApiOperation({ summary: 'Felhasználó törlése ID alapján' })
  @ApiParam({ name: 'id', description: 'A törlendő felhasználó azonosítója', type: String })
  @ApiResponse({ status: 200, description: 'A felhasználó sikeresen törölve.' })
  @ApiResponse({ status: 403, description: 'Hozzáférés megtagadva: csak adminisztrátorok törölhetnek felhasználókat.' })
  @ApiResponse({ status: 400, description: 'A keresett ID nem található, vagy egyéb hiba történt a törlés során' })
  @ApiBearerAuth()
  async remove(@Param('id') id: string, @Request() req) {
    try {
      if (req.user.role != "Admin") {
        throw new UnauthorizedException();
      }
      else {
        return await this.userService.remove(+id);
      }
    } catch (e) {
      throw new BadRequestException('A keresett ID nem található' + e)
    }
  }

}
