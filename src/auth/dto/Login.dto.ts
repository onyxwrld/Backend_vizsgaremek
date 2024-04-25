import { IsString, isString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto{
    @ApiProperty({ description: 'Felhasználónév', example: 'johndoe' })
    @IsString()
    username: string;
    @ApiProperty({ description: 'Jelszó', example: 'password123' })
    @IsString()
    password: string;
}
