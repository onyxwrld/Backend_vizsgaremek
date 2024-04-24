import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class ChangePassDto{
@ApiProperty({ description: 'A felhasználó régi jelszava', example: 'oldPassword123' })
@IsString()
oldpass: string
@ApiProperty({ description: 'A felhasználó új jelszava', example: 'newPassword123' })
@IsString()
newpass: string
}