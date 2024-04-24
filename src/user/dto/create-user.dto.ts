import { IsEmail, IsEnum, IsNotEmpty, IsString, Max, MaxLength, Min, MinLength, min } from "class-validator";
import { RoleType } from "@prisma/client";
import { Optional } from "@nestjs/common"; 
import { ApiProperty } from "@nestjs/swagger";
export class CreateUserDto {
    @ApiProperty({ description: 'Felhasználónév', example: 'johndoe' })
    @IsNotEmpty({message: 'A név megadása kötelező'})
    @MaxLength(20, {message: "A név maximum 20 karakter lehet"})
    @MinLength(3, {message: "A név minimum 3 karakter kell hogy legyen"})
    username: string;
    
    @ApiProperty({ description: 'E-mail cím', example: 'john.doe@example.com' })
    @IsNotEmpty({ message: 'Az e-mail cím megadása kötelező.' })
    @IsEmail({}, { message: 'Érvénytelen e-mail cím.' })
    email: string;
  
    @ApiProperty({ description: 'Jelszó', example: 'password123' })
    @IsNotEmpty({ message: 'A jelszó megadása kötelező.' })
    @MinLength(6, { message: 'A jelszó minimum 6 karakter kell hogy legyen.' })
    password: string;
  
    @ApiProperty({ description: 'Keresztnév', example: 'John' })
    @IsString({ message: 'A keresztnévnek szöveges típusúnak kell lennie.' })
    first_name: string;
  
    @ApiProperty({ description: 'Vezetéknév', example: 'Doe' })
    @IsString({ message: 'A vezetéknévnek szöveges típusúnak kell lennie.' })
    last_name: string;
  
    @ApiProperty({ description: 'Token', example: 'abcdef12345', required: false })
    token: string;
  
    @ApiProperty({ description: 'Szerepkör', enum: RoleType, required: false })
    @Optional()
    role: RoleType;
}
