import { IsString } from "class-validator"

export class ChangePassDto{
@IsString()
oldpass: string
@IsString()
newpass: string
}